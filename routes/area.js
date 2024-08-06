const express = require('express');
const router = express.Router();

const areaController = require('../controller/areaController');

router.post('/createdArea', areaController.createArea);
router.get('/getArea/:agnombre/:agid', areaController.getArea);


module.exports = router;