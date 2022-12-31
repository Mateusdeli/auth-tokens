import HttpMock from '../../../__mocks__/http'
import AuthController from '../../../../src/controllers/auth'
import AuthService from '../../../../src/services/auth'

describe('AuthController', () => {
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

    it('Deve efetuar o processamento do login', async () => {
        const request = HttpMock.mockRequest({ sessionData: { email: 'teste@teste.com', password: '1234'} })
        const response = HttpMock.mockResponse()
        
        jest.spyOn(AuthService, 'login').mockReturnValue({ token, refreshToken } as any)
        await AuthController.login(request, response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.send).toHaveBeenCalledWith({
            message: 'Login realizado com sucesso',
            data: { token, refreshToken }
        })
    })

    it('Deve efetuar o processamento do logout', async () => {
        const request = HttpMock.mockRequest({ sessionData: { refreshToken } })
        const response = HttpMock.mockResponse()

        jest.spyOn(AuthService, 'logout').mockResolvedValue(true)
        await AuthController.logout(request, response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.send).toHaveBeenCalledWith({
            message: 'Logout realizado com sucesso!'
        })
    })

    it('Deve efetuar o processamento do refresh token', async () => {
        const request = HttpMock.mockRequest({ userData: { email: 'teste@teste.com', password: '1234'} })
        const response = HttpMock.mockResponse()

        jest.spyOn(AuthService, 'refresh').mockReturnValue({ token, refreshToken })
        await AuthController.refresh(request, response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.send).toHaveBeenCalledWith({
            token,
            refreshToken
        })
    })

    it('Deve efetuar o processamento do carregamento da sessao', async () => {
        const request = HttpMock.mockRequest({ sessionData: { token } })
        const response = HttpMock.mockResponse()

        jest.spyOn(AuthService, 'loadSession').mockReturnValue({ token, refreshToken })
        await AuthController.loadSession(request, response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.send).toHaveBeenCalledWith({
            data: {
                token,
                refreshToken
            }
        })
    })
})