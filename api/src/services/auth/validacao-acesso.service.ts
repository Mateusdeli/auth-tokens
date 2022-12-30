import User from "../../interfaces/User"

const validar = ({ email, password }: User) => {
    if (!email || !password) {
        return false
    }
    return email === 'teste@teste.com' && password === '1234'
}

export default {
    validar
}