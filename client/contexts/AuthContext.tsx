import { createContext, useCallback, useState } from 'react'
import http from '../utils/http'

interface DadosAutenticacaoProps {
  token: string,
  refreshToken: string,
  isLogged: boolean,
}

interface LoginProps {
  email: string
  password: string
}

export interface AuthContextProps {
  dadosAutenticacao: DadosAutenticacaoProps
  checaUsuarioAutenticado: Promise<Boolean> 
  alterarDadosAutenticacao: (dados: { token: string, refreshToken: string}) => void
  efetuarLogin: (dados: LoginProps) => Promise<void>
  efetuarLogout: () => Promise<void>
}

export const AuthContext = createContext({})

interface AuthProviderProps {
    children: JSX.Element
}

export default function AuthProvider({ children }: AuthProviderProps) {

  const [dadosAutenticacao, setDadosAutenticacao] = useState<DadosAutenticacaoProps>({
    token: '',
    refreshToken: '',
    isLogged: false,
  })

  const checaUsuarioAutenticado = useCallback(async () => {
    if (dadosAutenticacao.isLogged && dadosAutenticacao.token) {
      return Promise.resolve(true)
    }

    const token = sessionStorage.getItem('token')
    if (!token) {
      return Promise.reject(false)
    }

    try {
      const resposta = await http.post('/auth/loadSession', { token })
      const dados = await resposta.data
      if (!dados) {
        return Promise.reject(false)
      }
      setDadosAutenticacao({ token, refreshToken: dados.data.refreshToken, isLogged: true })
      return Promise.resolve(true)
    } catch (erro) {
      return Promise.reject(false)
    }
  }, [dadosAutenticacao.isLogged, dadosAutenticacao.token])

  const efetuarLogin = async ({ email, password }: LoginProps) => {
    const resposta = await http.post('/auth/login', { email, password })
    const { token, refreshToken } = await resposta.data.data
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('refreshToken', refreshToken)
    setDadosAutenticacao({ token, refreshToken, isLogged: true })
  }

  const efetuarLogout = async () => {
    try {
      const refreshToken = sessionStorage.getItem('refreshToken')
      sessionStorage.clear()
      await http.post('/auth/logout', { refreshToken })
      setDadosAutenticacao({ token: '', refreshToken: '', isLogged: false })
    } catch (erro) {
      return Promise.reject(erro)
    }
  }

  return (
    <AuthContext.Provider value={{
      dadosAutenticacao,
      checaUsuarioAutenticado,
      efetuarLogin,
      efetuarLogout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
