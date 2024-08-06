const express = require('express');
const router = express.Router();

const agenciaController = require('../controller/agenciaController');

router.post('/createdAgencia', agenciaController.createAgencia);
router.post('/getAgencia/:agnombre/:agid', agenciaController.getAgencia);

router.get('/listaAgencia', agenciaController.listaAgencia);
router.get('/getId/:agnombre/:agid', agenciaController.getId);


module.exports = router;