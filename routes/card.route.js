const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const CardController = require('../controllers/card.controller');
const MerchantController = require('../controllers/merchant.controller');
const UserController = require('../controllers/user.controller');


// router.post('/transaction/add', middleware.mainAuth, TransactionController.add);

module.exports = router;