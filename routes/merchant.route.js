const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const CardController = require('../controllers/card.controller');
const MerchantController = require('../controllers/merchant.controller');
const UserController = require('../controllers/user.controller');

const middleware = require('../middleware/auth');

 router.get('/merchant', MerchantController.welcome);

 router.post('/merchant/create', MerchantController.createMerchant);

module.exports = router;