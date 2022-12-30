import AuthService from '../../../../src/services/auth'
import ValidacaoDadosService from '../../../../src/services/auth/validacao-acesso.service'

describe('AuthService', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4'
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4'

    jest.mock('redis', () => ({
        createClient: jest.fn(() => ({
            connect: jest.fn(),
            get: jest.fn((key) => key),
            set: jest.fn((key, value) => {}),
            on: jest.fn(),
        }))
    }))
    jest.mock('jsonwebtoken', () => ({
        sign: jest.fn(),
        verify: jest.fn(),
    }))

    it('Deve realizar o login corretamente', async () => {
        const email = 'teste@teste.com'
        const password = '1234'


        jest.spyOn(ValidacaoDadosService, 'validar').mockReturnValue(true)
        const resposta = await AuthService.login({ email, password })

        expect(resposta).toHaveProperty('token', token)
        expect(resposta).toHaveProperty('refreshToken', refreshToken)
    })

    it('Deve lançar um erro ao tentar realizar o login com dados de acesso invalidos', async () => {
        const email = 'teste2@teste.com'
        const password = '123412'

        try {
            jest.spyOn(ValidacaoDadosService, 'validar').mockReturnValue(false)
            await AuthService.login({ email, password })
        }
        catch (erro: any) {
            expect(erro.message).toBe('Email ou senha estao incorretos, tente novamente')
            expect(erro.name).toBe('Error')
        }
    })

    it('Deve tentar realizar o login sem informar os dados de acesso', async () => {
        const email = ''
        const password = ''

        try {
            await AuthService.login({ email, password })
        } catch (erro: any) {
            expect(erro.message).toBe('Email ou senha nao informados')
            expect(erro.name).toBe('Error')
        }
    })

    it('Deve realizar o logout com sucesso', async () => {
        const resposta = await AuthService.logout(refreshToken)
        expect(resposta).toEqual(true)
    })

    it('Deve lançar um erro ao tentar realizar o logout sem informar no refresh token', async () => {
        try {
            const refreshToken = ''
            await AuthService.logout(refreshToken)
        } catch (erro: any) {
            expect(erro.message).toBe('Refresh token nao informado.')
            expect(erro.name).toBe('Error')
        }
    })

    it('Deve obter o refresh token corretamente', async () => {
        const email = 'teste2@teste.com'
        const password = '123412'

        const resposta = await AuthService.refresh({ email, password })

        expect(resposta).toHaveProperty('token', token)
        expect(resposta).toHaveProperty('refreshToken', refreshToken)
    })

    it('Deve lançar erro ao tentar obter refresh token com email e senha vazios', async () => {
        try {
            const email = ''
            const password = ''    
            await AuthService.refresh({ email, password })
        } catch (erro: any) {
            expect(erro.message).toBe('Email ou senha nao foram informados, tente novamente')
            expect(erro.name).toBe('Error')
        }
    })

    it('Deve carregar a sessao corretamente', () => {
        const resposta = AuthService.loadSession(token)

        expect(resposta).toBe(token)
    })

    it('Deve lançar erro ao tentar carregar a sessao com token invalido', () => {
        try {
            const token = ''
            AuthService.loadSession(token)
        } catch (erro: any) {
            expect(erro.message).toBe('Nao foi possivel carregar a sessão.')
            expect(erro.name).toBe('Error')
        }
    })
})
