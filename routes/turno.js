const express = require('express');
const router = express.Router();

const turnoController = require('../controller/turnoController');

router.post('/createTurno', turnoController.createTurno);
router.get('/getUltimo', turnoController.getUltimoTurno);


module.exports = router;