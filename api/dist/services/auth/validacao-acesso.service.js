"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validar = void 0;
const validar = ({ email, password }) => {
    if (!email || !password) {
        return false;
    }
    return email === 'teste@teste.com' && password === '1234';
};
exports.validar = validar;
