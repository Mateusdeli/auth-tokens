import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    if (token && refreshToken) {
        config.headers!['authorization'] = `Bearer ${token}`
        config.headers!['x-refresh-token'] = refreshToken
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const status = error.response.status
    const refresh = sessionStorage.getItem('refreshToken')

    if (status === 401) {
        window.location.replace('/')
        return Promise.reject(error)
    }

    if (status === 403 && refresh) {
        try {
            const resposta = await instance.post('/auth/refresh', { refreshToken: refresh })
            const { token, refreshToken } = resposta.data
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('refreshToken', refreshToken)
            if (refreshToken && token) {
                return {
                    refreshToken, token
                };
            }
        } catch (erro) {
            window.location.replace('/')
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})

export default instance