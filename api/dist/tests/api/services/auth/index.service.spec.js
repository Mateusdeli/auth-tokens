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
const auth_1 = __importDefault(require("../../../../src/services/auth"));
const validacao_acesso_service_1 = __importDefault(require("../../../../src/services/auth/validacao-acesso.service"));
describe('AuthService', () => {
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
    jest.mock('jsonwebtoken', () => ({
        sign: jest.fn(),
        verify: jest.fn(),
    }));
    it('Deve realizar o login corretamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'teste@teste.com';
        const password = '1234';
        jest.spyOn(validacao_acesso_service_1.default, 'validar').mockReturnValue(true);
        const resposta = yield auth_1.default.login({ email, password });
        expect(resposta).toHaveProperty('token', token);
        expect(resposta).toHaveProperty('refreshToken', refreshToken);
    }));
    it('Deve lançar um erro ao tentar realizar o login com dados de acesso invalidos', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'teste2@teste.com';
        const password = '123412';
        try {
            jest.spyOn(validacao_acesso_service_1.default, 'validar').mockReturnValue(false);
            yield auth_1.default.login({ email, password });
        }
        catch (erro) {
            expect(erro.message).toBe('Email ou senha estao incorretos, tente novamente');
            expect(erro.name).toBe('Error');
        }
    }));
    it('Deve tentar realizar o login sem informar os dados de acesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = '';
        const password = '';
        try {
            yield auth_1.default.login({ email, password });
        }
        catch (erro) {
            expect(erro.message).toBe('Email ou senha nao informados');
            expect(erro.name).toBe('Error');
        }
    }));
    it('Deve realizar o logout com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const resposta = yield auth_1.default.logout(refreshToken);
        expect(resposta).toEqual(true);
    }));
    it('Deve lançar um erro ao tentar realizar o logout sem informar no refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshToken = '';
            yield auth_1.default.logout(refreshToken);
        }
        catch (erro) {
            expect(erro.message).toBe('Refresh token nao informado.');
            expect(erro.name).toBe('Error');
        }
    }));
    it('Deve obter o refresh token corretamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'teste2@teste.com';
        const password = '123412';
        const resposta = yield auth_1.default.refresh({ email, password });
        expect(resposta).toHaveProperty('token', token);
        expect(resposta).toHaveProperty('refreshToken', refreshToken);
    }));
    it('Deve lançar erro ao tentar obter refresh token com email e senha vazios', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = '';
            const password = '';
            yield auth_1.default.refresh({ email, password });
        }
        catch (erro) {
            expect(erro.message).toBe('Email ou senha nao foram informados, tente novamente');
            expect(erro.name).toBe('Error');
        }
    }));
    it('Deve carregar a sessao corretamente', () => {
        const resposta = auth_1.default.loadSession(token);
        expect(resposta).toBe(token);
    });
    it('Deve lançar erro ao tentar carregar a sessao com token invalido', () => {
        try {
            const token = '';
            auth_1.default.loadSession(token);
        }
        catch (erro) {
            expect(erro.message).toBe('Nao foi possivel carregar a sessão.');
            expect(erro.name).toBe('Error');
        }
    });
});
