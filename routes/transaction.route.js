const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const validationSystem = require('../middleware/validation').validationSystem;

router.post('/create', validationSystem, TransactionController.create);

module.exports = router;