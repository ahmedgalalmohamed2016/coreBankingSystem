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
        var resaultData = { newUser: false, newMerchant: false };
        async.series([
            function (cb) {
                UserModel.findOne({ mobileNumber: req.body.mobileNumber },
                    function (err, res) {
                        if (err)
                            return cb("error in finding user !")
                        if (!res)
                            resaultData.newUser = true
                        else
                            resaultData.userData = res;
                        return cb(null);
                    })
            },
            function (cb) {
                if (!resaultData.newUser)
                    return cb(null);
                UserModel.create({
                    mappingId: uuidv4(),
                    role: 'merchant',
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address || '',
                    userNumber: helperFunction.userNumber(defaultValue.userNumber),
                    email: req.body.email || '',
                    mobileNumber: req.body.mobileNumber,
                    gender: req.body.gender || '',
                    country: req.body.country,
                    userId: new mongoose.mongo.ObjectId(),
                }, function (err, res) {
                    if (err)
                        return cb("error in creating user !")
                    resaultData.userData = res;
                    return cb(null)
                })
            },
            function (cb) {
                merchantModel.findOne({ mainPhoneNumber: req.body.mobileNumber },
                    function (err, res) {
                        if (err)
                            return cb("error in finding merchant !")
                        if (!res)
                            resaultData.newMerchant = true
                        else
                            resaultData.merchantData = res;
                        return cb(null);
                    })
            },
            function (cb) {
                if (!resaultData.newMerchant)
                    return cb(null);
                merchantModel.create({
                    mappingId: uuidv4(),
                    address: req.body.address || '',
                    userId: resaultData.userData.userId,
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
                    resaultData.merchantData = res;
                    return cb(null)
                })
            }
        ],
            function (err, res) {
                if (err)
                    return callback(err)
                return callback(null, resaultData.merchantData);
            });
    }