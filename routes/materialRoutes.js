const express = require('express');
const materialController = require('../controllers/materialController');

const router = express.Router();

router.get('/:company', materialController.getMaterials);
router.get('/:company/:productName', materialController.getMaterialDetails);

module.exports = router;
