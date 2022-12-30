import { Router } from 'express'
import AuthController from '../../controllers/auth'
import { validarRefreshToken } from '../../middlewares/auth'

const router = Router()

router.post('/login', AuthController.login as any)
router.post('/logout', AuthController.logout as any)
router.post('/refresh', validarRefreshToken as any, AuthController.refresh as any)
router.post('/loadSession', AuthController.loadSession as any)

export default router