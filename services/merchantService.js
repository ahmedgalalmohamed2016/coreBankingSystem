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

module.exports.createMerchant =
    function (req, callback) {
        var resultData = { newUser: false, newMerchant: false };
        async.series([
            function (cb) {
                UserModel.findOne({ mobileNumber: req.body.mobileNumber },
                    function (err, res) {
                        if (err)
                            return cb("error in finding user !")
                        if (!res)
                            resultData.newUser = true
                        else
                            resultData.userData = res;
                        return cb(null);
                    })
            },
            function (cb) {
                if (!resultData.newUser)
                    return cb(null);
                UserModel.create({
                    mappingId: uuidv4(),
                    role: 'merchant',
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address || '',
                    userNumber: helperFunction.userNumber(defaultValue.userNumber),
                    userName: req.body.userName,
                    email: req.body.email || '',
                    mobileNumber: req.body.mobileNumber,
                    gender: req.body.gender || '',
                    country: req.body.country,
                    isActive: false,
                    isVerified: false,
                    userId: new mongoose.mongo.ObjectId(),
                }, function (err, res) {
                    if (err)
                        return cb("error in creating user !")
                    resultData.userData = res;
                    return cb(null)
                })
            },
            function (cb) {
                merchantModel.findOne({ mainPhoneNumber: req.body.mobileNumber },
                    function (err, res) {
                        if (err)
                            return cb("error in finding merchant !")
                        if (!res)
                            resultData.newMerchant = true
                        else
                            resultData.merchantData = res;
                        return cb(null);
                    })
            },
            function (cb) {
                if (!resultData.newMerchant)
                    return cb(null);
                merchantModel.create({
                    mappingId: uuidv4(),
                    address: req.body.address || '',
                    userId: resultData.userData.userId,
                    country: req.body.country,
                    city: req.body.city,
                    legalName: req.body.legalName,
                    commonName: req.body.commonName,
                    isActive: false,
                    email: req.body.email || '',
                    mainPhoneNumber: req.body.mobileNumber,
                    homapageDesc: req.body.homapageDesc || '',
                    bio: req.body.bio || '',
                    merchantId: new mongoose.mongo.ObjectId(),
                    currency: req.body.currency
                }, function (err, res) {
                    if (err)
                        return cb("error in creating merchant !")
                    resultData.merchantData = res;
                    return cb(null)
                })
            }
        ],
            function (err, res) {
                if (err)
                    return callback(err)
                return callback(null, resultData.merchantData);
            });
    }
module.exports.merchantList =
    function (req, callback) {
        var resultData = {
        };
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
                console.log(resultData.pageNum);
                
                merchantModel.find({}).sort("createdAt DESC")
                    .skip(resultData.pageNum* 10)
                    .limit(10)
                    .exec(function (err, res) {
                        if (err || !res)
                            return cb("error in finding merchant !")
                        resultData.merchantList = res
                        return cb(null);
                    })
            },
            function (cb) {
                merchantModel.count({})
                    .exec(function (err, res) {
                        if (err || !res)
                            return cb("error in counting merchant !")
                        resultData.count = res;
                        return cb(null);
                    })
            }
        ],
            function (err) {
                if (err)
                    return callback(err)
                return callback(null, resultData);
            });
    }