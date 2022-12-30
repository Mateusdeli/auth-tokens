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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("../../../__mocks__/http"));
const AuthController = require('../../../../src/controllers/auth');
const AuthService = require('../../../../src/services/auth');
describe('AuthController', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4';
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4';
    jest.mock('redis', () => ({
        createClient: jest.fn(() => ({
            connect: jest.fn(),
            get: jest.fn((key) => key),
            set: jest.fn((key, value) => { }),
            on: jest.fn(),
        }))
    }));
    it('Deve efetuar o processamento do login', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = http_1.default.mockRequest({ sessionData: { email: 'teste@teste.com', password: '1234' } });
        const response = http_1.default.mockResponse();
        jest.spyOn(AuthService, 'login').mockReturnValue({ token, refreshToken });
        yield AuthController.login(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith({
            message: 'Login realizado com sucesso',
            data: { token, refreshToken }
        });
    }));
    it('Deve efetuar o processamento do logout', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = http_1.default.mockRequest({ sessionData: { refreshToken } });
        const response = http_1.default.mockResponse();
        jest.spyOn(AuthService, 'logout').mockReturnValue(true);
        yield AuthController.logout(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith({
            message: 'Logout realizado com sucesso!'
        });
    }));
    it('Deve efetuar o processamento do refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = http_1.default.mockRequest({ userData: { email: 'teste@teste.com', password: '1234' } });
        const response = http_1.default.mockResponse();
        jest.spyOn(AuthService, 'refresh').mockReturnValue({ token, refreshToken });
        yield AuthController.refresh(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith({
            token,
            refreshToken
        });
    }));
    it('Deve efetuar o processamento do carregamento da sessao', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = http_1.default.mockRequest({ sessionData: { token } });
        const response = http_1.default.mockResponse();
        jest.spyOn(AuthService, 'loadSession').mockReturnValue({ token, refreshToken });
        yield AuthController.loadSession(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith({
            data: {
                token,
                refreshToken
            }
        });
    }));
});
