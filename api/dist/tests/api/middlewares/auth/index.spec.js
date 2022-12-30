"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { autorizacao, validarRefreshToken } = require('../../../../src/middlewares/auth');
const { mockRequest, mockResponse } = require('../../../__mocks__/http');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4';
const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4';
jest.mock('redis', () => ({
    createClient: jest.fn(() => ({
        connect: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        on: jest.fn(),
    }))
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn((payload, secretOrPublicKey, options) => token),
    verify: jest.fn(),
}));
describe('AuthMiddleware', () => {
    it('Deve processar a autorizacao de rotas corretamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = mockRequest({
            headers: {
                'authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
        });
        const response = mockResponse();
        const resposta = yield autorizacao(request, response, jest.fn());
        expect(typeof (resposta)).toBe(typeof (undefined));
    }));
    it('Deve retornar erro quando os tokens nao sao informados', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = mockRequest({
            headers: { 'authorization': '', 'x-refresh-token': '' }
        });
        const response = mockResponse();
        yield autorizacao(request, response, jest.fn());
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.send).toHaveBeenCalledWith({
            message: 'Tokens nao informados.'
        });
    }));
    it('Deve processar validacao do refresh token com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = mockRequest({
            sessionData: { refreshToken }
        });
        const response = mockResponse();
        const resposta = yield validarRefreshToken(request, response, jest.fn());
        expect(typeof (resposta)).toBe(typeof (undefined));
    }));
});
module.exports = {
    autorizacao,
    validarRefreshToken
};
