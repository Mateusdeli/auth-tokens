"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.autorizacao, (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    });
});
exports.default = router;
