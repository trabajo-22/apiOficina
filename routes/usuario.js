const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

router.post('/create', usuarioController.createUsuario);
router.get('/getAll', usuarioController.getUsuario);
router.post('/getlogin/:cedula', usuarioController.login);

module.exports = router;