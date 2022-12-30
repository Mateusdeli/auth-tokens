"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validar = ({ email, password }) => {
    if (!email || !password) {
        return false;
    }
    return email === 'teste@teste.com' && password === '1234';
};
exports.default = {
    validar
};
