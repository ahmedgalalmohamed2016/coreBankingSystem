const merchant = require('../models/merchant.model');
const UserModel = require('../models/user.model');
const CardModel = require('../models/card.model');
const TransactionModel = require('../models/transaction.model');
const _ = require("lodash");
const request = require("superagent");
var fs = require("fs");
const mongoose = require('mongoose');

exports.add = async(req, res) => {
    try {
        return res.send("Can not add this card.");
    } catch (err) {
        return res.send("Can not add this card.");
    }
}