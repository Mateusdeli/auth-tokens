const validar = ({ email, password }) => {
    if (!email || !password) {
        return false
    }
    return email === 'teste@teste.com' && password === '1234'
}

module.exports = {
    validar
}