const { autorizacao, validarRefreshToken } = require('../../../../src/middlewares/auth')
const { mockRequest, mockResponse } = require('../../../__mocks__/http')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4'
const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4'

jest.mock('redis', () => ({
    createClient: jest.fn(() => ({
        connect: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        on: jest.fn(),
    }))
}))

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn((payload, secretOrPublicKey, options) => token),
    verify: jest.fn(),
}))

describe('AuthMiddleware', () => {
    it('Deve processar a autorizacao de rotas corretamente', async () => {
        const request = mockRequest({
            headers: {
                'authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
        })

        const response = mockResponse()

        const resposta = await autorizacao(request, response, jest.fn())

        expect(typeof(resposta)).toBe(typeof(undefined))
    });

    it('Deve retornar erro quando os tokens nao sao informados', async () => {
        const request = mockRequest({
            headers: { 'authorization': '', 'x-refresh-token': '' }
        })
        const response = mockResponse()

        await autorizacao(request, response, jest.fn())

        expect(response.status).toHaveBeenCalledWith(401)
        expect(response.send).toHaveBeenCalledWith({
            message: 'Tokens nao informados.'
        })
    })

    it('Deve processar validacao do refresh token com sucesso', async () => {
        const request = mockRequest({
            sessionData: { refreshToken }
        })
        const response = mockResponse()

        const resposta = await validarRefreshToken(request, response, jest.fn())

        expect(typeof(resposta)).toBe(typeof(undefined))
    })
})

module.exports = {
    autorizacao,
    validarRefreshToken
}