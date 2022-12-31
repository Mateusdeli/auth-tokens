import { Response } from "express"
import Request from "../../interfaces/Request"
import { BAD_REQUEST, SUCCESS, UNAUTHORIZED } from '../../constants/status-code'
import AuthService from '../../services/auth'

export default {
    login: async (req: Request, res: Response) => {
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

    logout: async (req: Request, res: Response) => {
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

    refresh: (req: Request, res: Response) => {
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

    loadSession: (req: Request, res: Response) => {
        const { token } = req.body
        if (!token) {
            return res.status(UNAUTHORIZED)
        }
        try {
            const dados = AuthService.loadSession(token)
            return res.status(SUCCESS).send({ data: { ...dados } })
        } catch (erro) {
            return res.status(UNAUTHORIZED)
        }
    }
}

