const express = require('express');
const router = express.Router();

const codigoController = require('../controller/codigoController');

router.get('/getCodigo', codigoController.getCodigo);


module.exports = router;