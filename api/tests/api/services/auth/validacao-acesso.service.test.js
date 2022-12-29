const ValidacaoDadosService = require('../../../../src/services/auth/validacao-acesso.service')

describe('ValidacaoAcessoService', () => {
    it('Deve validar dados de acesso com sucesso', () => {
        const email = 'teste@teste.com'
        const password = '1234'

        const resultado = ValidacaoDadosService.validar({ email, password })
        expect(resultado).toBe(true)
    })

    it('Deve validar dados de acesso errado', () => {
        const email = 'teste2@teste.com'
        const password = '12345'

        const resultado = ValidacaoDadosService.validar({ email, password })
        expect(resultado).toBe(false)
    })

    it('Deve validar dados de acesso estao vazios', () => {
        const email = null
        const password = null

        const resultado = ValidacaoDadosService.validar({ email, password })
        expect(resultado).toBe(false)
    })
})