const { Router } = require('express')
const { autorizacao } = require('../../middlewares/auth')

const router = Router()

router.get('/', autorizacao, (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    })
})

module.exports = router