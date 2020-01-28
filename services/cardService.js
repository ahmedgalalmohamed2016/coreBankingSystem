const async = require('async');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
//database tables--------------------------------
const merchantModel = require('../models/merchant.model');
const UserModel = require('../models/user.model');
const CardModel = require('../models/card.model');
const TransactionModel = require('../models/transaction.model');
//end of database tables-------------------------

const helperFunction = require('../services/helperFunctions');
const defaultValue = require('../config/defaultValues');
const statusCode = require('../config/statusError').statusCode;

module.exports.addCard =
    function (req, callback) {
        var resultData = { newUser: false, newMerchant: false };
        async.series([
            function (cb) {
                UserModel.findOne({ userId: req.body.userId },
                    function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "cannot find user data with this id !" });
                        resultData.userData = res;
                        return cb(null);
                    })
            },
            function (cb) {
                resultData.savedCardNum = helperFunction.cardSecure(req.body.cardNum);
                return cb(null);
            },
            function (cb) {
                try {
                    resultData.encCardnumber = helperFunction.encrypt(JSON.stringify({
                        userId: req.body.userId,
                        cardNum: req.body.cardNum,
                        expireMonth: req.body.expireMonth,
                        expireYear: req.body.expireYear,
                        holderName: req.body.holderName,
                        csv: req.body.csv
                    }))
                    // resultData.encCardnumber = JSON.stringify(resultData.encCardnumber)
                } catch (err) {

                }

                return cb(null);
            },
            function (cb) {
                CardModel.find({
                    cardNumber: resultData.savedCardNum
                }, function (err, res) {
                    if (err)
                        return cb({ statusCode: statusCode.badRequest, message: "cannot find card for this user" });
                    if (res.length >= 1)
                        return cb({ statusCode: statusCode.created, message: "this user already have the same card" });
                    return cb(null);
                })
            },
            function (cb) {
                CardModel.create({
                    creationDate: new Date(),
                    userId: req.body.userId,
                    cardNumber: resultData.savedCardNum,
                    encCardnumber: resultData.encCardnumber,
                    expireMonth: req.body.expireMonth,
                    expireYear: req.body.expireYear,
                    holderName: req.body.holderName,
                    isDeleted: false
                },
                    function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "cannot create card for this user" });
                        resultData = res;

                        return cb(null);
                    })
            },
        ],
            function (err) {
                if (err)
                    return callback({ statusCode: err.statusCode, message: err.message });
                return callback(null, { statusCode: resultData.statusCode, message: resultData.message, data: resultData });
            });
    }

module.exports.list =
    function (req, callback) {
        var resultData = {};
        async.series([
            function (cb) {
                try {
                    resultData.pageNum = req.body.pageNum ? parseInt(req.body.pageNum) : 0
                } catch (err) {
                    resultData.pageNum = 0;
                }

                return cb(null);
            },
            function (cb) {
                CardModel.find({ userId: req.body.userId })
                    .sort("createdAt DESC")
                    .skip(resultData.pageNum * defaultValue.limit)
                    .limit(defaultValue.limit)
                    .exec(function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "error in finding merchant !" })
                        resultData.userCardList = res
                        return cb(null);
                    })
            },
            function (cb) {
                CardModel.count({ userId: req.body.userId })
                    .exec(function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "error in counting merchant !" })
                        resultData.count = res;
                        return cb(null);
                    })
            }
        ],
            function (err) {
                if (err)
                    return callback({ statusCode: err.statusCode, message: err.message });
                return callback(null, { statusCode: statusCode.oK, message: "success", data: resultData });
            });
    }