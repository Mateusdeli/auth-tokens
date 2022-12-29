const jwt = require('jsonwebtoken')
const client = require('../../utils/redis')
const { UNAUTHORIZED, FORBIDDEN } = require('../../constants/status-code')

const {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY
} = process.env

const autorizacao = async (req, res, next) => {
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
                message: 'Refresh token invalido'
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

const validarRefreshToken = (req, res, next) => {
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

module.exports = {
    autorizacao,
    validarRefreshToken
}