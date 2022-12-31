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
const status_code_1 = require("../../constants/status-code");
const auth_1 = __importDefault(require("../../services/auth"));
exports.default = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const resposta = yield auth_1.default.login({ email, password });
            return res.status(status_code_1.SUCCESS).send({
                message: 'Login realizado com sucesso',
                data: Object.assign({}, resposta)
            });
        }
        catch (erro) {
            return res.status(status_code_1.BAD_REQUEST).send({
                message: erro
            });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.body;
            const logoutRealizado = yield auth_1.default.logout(refreshToken);
            if (logoutRealizado) {
                return res.status(status_code_1.SUCCESS).send({
                    message: 'Logout realizado com sucesso!'
                });
            }
        }
        catch (erro) {
            return res.status(status_code_1.BAD_REQUEST).send({
                message: erro
            });
        }
    }),
    refresh: (req, res) => {
        try {
            const { email, password } = req.user;
            const resposta = auth_1.default.refresh({ email, password });
            return res.status(status_code_1.SUCCESS).send(resposta);
        }
        catch (erro) {
            return res.status(status_code_1.BAD_REQUEST).send({
                message: 'Houve um erro ao tentar obter um refresh token.'
            });
        }
    },
    loadSession: (req, res) => {
        const { token } = req.body;
        if (!token) {
            return res.status(status_code_1.UNAUTHORIZED);
        }
        try {
            const dados = auth_1.default.loadSession(token);
            return res.status(status_code_1.SUCCESS).send({ data: Object.assign({}, dados) });
        }
        catch (erro) {
            return res.status(status_code_1.UNAUTHORIZED);
        }
    }
};
