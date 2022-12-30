import { Request, Response } from "express"

import { Router } from 'express'
import { autorizacao } from '../../middlewares/auth'

const router = Router()

router.get('/', autorizacao as any, (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Hello World'
    })
})

export default router