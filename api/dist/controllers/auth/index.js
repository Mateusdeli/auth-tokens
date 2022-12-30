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
Object.defineProperty(exports, "__esModule", { value: true });
const { BAD_REQUEST, SUCCESS, UNAUTHORIZED } = require('../../constants/status-code');
const AuthService = require('../../services/auth');
exports.default = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const resposta = yield AuthService.login({ email, password });
            return res.status(SUCCESS).send({
                message: 'Login realizado com sucesso',
                data: Object.assign({}, resposta)
            });
        }
        catch (erro) {
            return res.status(BAD_REQUEST).send({
                message: erro
            });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.body;
            const logoutRealizado = yield AuthService.logout(refreshToken);
            if (logoutRealizado) {
                return res.status(SUCCESS).send({
                    message: 'Logout realizado com sucesso!'
                });
            }
        }
        catch (erro) {
            return res.status(BAD_REQUEST).send({
                message: erro
            });
        }
    }),
    refresh: (req, res) => {
        try {
            const { email, password } = req.user;
            const resposta = AuthService.refresh({ email, password });
            return res.status(SUCCESS).send(resposta);
        }
        catch (erro) {
            return res.status(BAD_REQUEST).send({
                message: 'Houve um erro ao tentar obter um refresh token.'
            });
        }
    },
    loadSession: (req, res) => {
        const { token } = req.body;
        if (!token) {
            return res.status(UNAUTHORIZED);
        }
        try {
            const dados = AuthService.loadSession(token);
            return res.status(SUCCESS).send({ data: Object.assign({}, dados) });
        }
        catch (erro) {
            return res.status(UNAUTHORIZED);
        }
    }
};
