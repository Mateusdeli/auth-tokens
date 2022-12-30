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
const jwt = require('jsonwebtoken');
const redis = require('../../utils/redis');
const ValidacaoDadosService = require('./validacao-acesso.service');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } = process.env;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        throw new Error('Email ou senha nao informados');
    const dados = { email, password };
    const usuarioValido = ValidacaoDadosService.validar({ email, password });
    if (!usuarioValido)
        throw new Error('Email ou senha estao incorretos, tente novamente');
    const token = jwt.sign(dados, ACCESS_TOKEN_SECRET_KEY, { expiresIn: ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign(dados, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_TOKEN_TIME });
    return { token, refreshToken };
});
const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!refreshToken)
        throw new Error('Refresh token nao informado.');
    yield redis.set(refreshToken, refreshToken);
    return true;
});
const refresh = ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email ou senha nao foram informados, tente novamente');
    }
    const token = jwt.sign({ email, password }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign({ email, password }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_TOKEN_TIME });
    return {
        token,
        refreshToken
    };
};
const loadSession = (token) => {
    const dados = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    if (!dados) {
        throw new Error('Nao foi possivel carregar a sessão.');
    }
    return dados;
};
module.exports = {
    login,
    logout,
    refresh,
    loadSession
};
