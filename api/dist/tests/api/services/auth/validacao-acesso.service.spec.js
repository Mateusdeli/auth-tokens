"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validacao_acesso_service_1 = __importDefault(require("../../../../src/services/auth/validacao-acesso.service"));
describe('ValidacaoAcessoService', () => {
    it('Deve validar dados de acesso com sucesso', () => {
        const email = 'teste@teste.com';
        const password = '1234';
        const resultado = validacao_acesso_service_1.default.validar({ email, password });
        expect(resultado).toBe(true);
    });
    it('Deve validar dados de acesso errado', () => {
        const email = 'teste2@teste.com';
        const password = '12345';
        const resultado = validacao_acesso_service_1.default.validar({ email, password });
        expect(resultado).toBe(false);
    });
    it('Deve validar dados de acesso estao vazios', () => {
        const email = '';
        const password = '';
        const resultado = validacao_acesso_service_1.default.validar({ email, password });
        expect(resultado).toBe(false);
    });
});
