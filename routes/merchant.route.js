const express = require('express');
const router = express.Router();
const MerchantController = require('../controllers/merchant.controller');
const validationSystem = require('../middleware/validation').validationSystem;

const middlewareAuth = require('../middleware/auth');

 router.get('/welcome', MerchantController.welcome);

 router.post('/create', validationSystem, MerchantController.createMerchant);
 router.post('/list', validationSystem, MerchantController.merchantList);
 router.post('/transaction/settled', validationSystem, MerchantController.settled);
 router.post('/transaction/archived', validationSystem, MerchantController.archived);

module.exports = router;