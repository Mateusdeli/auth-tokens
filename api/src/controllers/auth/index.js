const { BAD_REQUEST, SUCCESS, UNAUTHORIZED } = require('../../constants/status-code')
const AuthService = require('../../services/auth')

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const resposta = await AuthService.login({ email, password })
            return res.status(SUCCESS).send({
                message: 'Login realizado com sucesso',
                data: { ...resposta }
            })
          } catch (erro) {
            return res.status(BAD_REQUEST).send({
                message: erro
            })
          }
    },

    logout: async (req, res) => {
        try {
            const { refreshToken } = req.body
            const logoutRealizado = await AuthService.logout(refreshToken)
            if (logoutRealizado) {
                return res.status(SUCCESS).send({
                    message: 'Logout realizado com sucesso!'
                })
            }
          } catch (erro) {
              return res.status(BAD_REQUEST).send({
                  message: erro
              })
          }
    },

    refresh: (req, res) => {
        try {
            const { email, password } = req.user
            const resposta = AuthService.refresh({ email, password })
            return res.status(SUCCESS).send(resposta)
        } catch (erro) {
            return res.status(BAD_REQUEST).send({
                message: 'Houve um erro ao tentar obter um refresh token.'
            })
        }
    },

    loadSession: (req, res) => {
        const { token } = req.body
        if (!token) {
            return res.status(UNAUTHORIZED)
        }
        try {
            const dados = loadSession(token)
            return res.status(SUCCESS).send({ dados })
        } catch (erro) {
            return res.status(UNAUTHORIZED)
        }
    }
}

