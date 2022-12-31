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
exports.validarRefreshToken = exports.autorizacao = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../../utils/redis"));
const status_code_1 = require("../../constants/status-code");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;
const autorizacao = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = (_b = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) !== null && _b !== void 0 ? _b : '';
        const refreshToken = (_c = req.headers['x-refresh-token']) !== null && _c !== void 0 ? _c : '';
        if (!token || !refreshToken) {
            return res.status(status_code_1.UNAUTHORIZED).send({
                message: 'Tokens nao informados.'
            });
        }
        const tokenBloqueado = yield redis_1.default.get(refreshToken);
        if (tokenBloqueado) {
            return res.status(status_code_1.UNAUTHORIZED).send({
                message: 'Refresh token informado esta bloqueado.'
            });
        }
        jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET_KEY);
        next();
    }
    catch (erro) {
        return res.status(status_code_1.FORBIDDEN).send({
            message: 'Token expirado.'
        });
    }
});
exports.autorizacao = autorizacao;
const validarRefreshToken = (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        const dados = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
        if (dados) {
            req.user = dados;
        }
        next();
    }
    catch (erro) {
        return res.status(status_code_1.UNAUTHORIZED).send({
            message: 'Sessão expirada!'
        });
    }
};
exports.validarRefreshToken = validarRefreshToken;
