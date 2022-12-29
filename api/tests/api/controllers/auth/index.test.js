const AuthController = require('../../../../src/controllers/auth')
const AuthService = require('../../../../src/services/auth')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4'
const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4'

jest.mock('../../../__mocks__/redis')

describe('AuthController', () => {
    it('Deve efetuar o processamento do login corretamente', async () => {
        const email = 'teste@teste.com'
        const password = '12134'

        const mockRequest = {
            body: { 
                email,
                password
            }
        }
        const mockResponse = () => {
            const res = {}
            res.status = jest.fn().mockReturnValue(res)
            res.status.send = jest.fn(() => {}).mockReturnValue(res)
            return res
        }
        jest.spyOn(AuthService, 'login').mockReturnValue({ token, refreshToken })
        const resposta = await AuthController.login(mockRequest, mockResponse())

        console.log(resposta.send(200));

        expect(resposta.status).toBe(200);
    });
})