const express = require('express');
const router = express.Router();
const CardController = require('../controllers/card.controller');
const validationSystem = require('../middleware/validation').validationSystem;

router.post('/add', validationSystem, CardController.addCard);
router.post('/list', validationSystem, CardController.list);

module.exports = router;