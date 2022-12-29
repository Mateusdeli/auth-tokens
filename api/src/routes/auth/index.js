const { Router } = require('express')

const AuthController = require('../../controllers/auth')
const { validarRefreshToken } = require('../../middlewares/auth')

const router = Router()

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/refresh', validarRefreshToken, AuthController.refresh)
router.post('/loadSession', AuthController.loadSession)

module.exports = router