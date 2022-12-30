import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import client from '../../utils/redis'
import { UNAUTHORIZED, FORBIDDEN } from '../../constants/status-code'
import Request from '../../interfaces/Request'

const {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY
} = process.env as any

const autorizacao = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1] ?? ''
        const refreshToken = req.headers['x-refresh-token'] ?? ''
        if (!token || !refreshToken) {
            return res.status(UNAUTHORIZED).send({
                message: 'Tokens nao informados.'
            })
        }
        const tokenBloqueado = await client.get(refreshToken)
        if (tokenBloqueado) {
            return res.status(UNAUTHORIZED).send({
                message: 'Refresh token informado esta bloqueado.'
            })
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY)
        next();
    } catch (erro) {
        return res.status(FORBIDDEN).send({
            message: 'Token expirado.'
        })
    }
}

const validarRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body
    try {
        const dados = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY)
        if (dados) {
            req.user = dados
        }
        next()
    } catch (erro) {
        return res.status(UNAUTHORIZED).send({
            message: 'Sessão expirada!'
        })
    }
}

export {
    autorizacao,
    validarRefreshToken
}