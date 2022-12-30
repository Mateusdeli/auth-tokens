"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const { autorizacao } = require('../../middlewares/auth');
const router = Router();
router.get('/', autorizacao, (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    });
});
exports.default = router;
