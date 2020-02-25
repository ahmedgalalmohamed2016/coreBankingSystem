const async = require('async');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
//database tables--------------------------------
const mssql = require('mssql');
//end of database tables-------------------------

const helperFunction = require('../services/helperFunctions');
const defaultValue = require('../config/defaultValues').values;

module.exports.createMerchant =
    function (req, callback) {
        var resultData = { newUser: false, newMerchant: false };
        async.series([
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`select * from userData where mobileNumber=${req.body.mobileNumber}`,
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

                const request = new mssql.Request()
                request.query(
                    request.template`INSERT INTO card (mappingId,role,firstName,lastName,address,userNumber,userName,email,mobileNumber,gender,country,isActive,isVerified,userId) VALUES (${uuidv4()},'merchant',${req.body.firstName},${req.body.lastName},${req.body.address || ''},${helperFunction.userNumber(defaultValue.userNumber)},${req.body.userName},${req.body.email || ''},${req.body.mobileNumber},${req.body.gender || ''},${req.body.country},${false},${false},${toString(new mongoose.mongo.ObjectId())})`,
                    function (err, res) {
                        if (err)
                            return cb("error in creating user !")
                        resultData.userData = res;
                        return cb(null)
                    })
            },
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`select * from merchant where mainPhoneNumber = ${req.body.mobileNumber}`,
                    function (err, res) {
                        
                        if (err)
                            return cb("error in finding merchant !")
                            
                        if (res.recordsets[0].length == 0)
                            resultData.newMerchant = true
                        else
                            resultData.merchantData = res.recordsets[0];
                            
                        return cb(null);
                    })
            },
            function (cb) {
                if (!resultData.newMerchant)
                    return cb(null);
                const request = new mssql.Request()
                request.query(
                    request.template`INSERT INTO merchant (mappingId,address,userId,country,city,legalName,commonName,isActive,email,mainPhoneNumber,homapageDesc,bio,merchantId,currency,creationDate) VALUES (${uuidv4()},${req.body.address || ''},${resultData.userData.userId},${req.body.country},${req.body.city},${req.body.legalName},${req.body.commonName},${false},${req.body.email || ''},${req.body.mobileNumber},${req.body.homapageDesc || ''},${req.body.bio || ''},${toString(new mongoose.mongo.ObjectId())},${req.body.currency},${new Date()})`,
                    function (err, res) {
                        if (err)
                            return cb("error in creating merchant !")
                        resultData.merchantData = res.recordsets[0];
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
                const request = new mssql.Request()
                request.query(
                    request.template`DECLARE @PageNumber AS INT, @RowspPage AS INT SET @PageNumber = ${resultData.pageNum} SET @RowspPage = ${defaultValue.limit} SELECT * FROM merchant ORDER BY creationDate DESC OFFSET ((@PageNumber) * @RowspPage) ROWS FETCH NEXT @RowspPage ROWS ONLY`,
                    function (err, res) {
                        if (err || !res)
                            return cb("error in finding merchant !")
                        resultData.merchantList = res.recordsets[0];
                        return cb(null);
                    })
            },
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`SELECT COUNT(*) AS NumberOfProducts FROM merchant`,
                    function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "cannot count merchant !" })
                        resultData.count = res.recordsets[0][0].NumberOfProducts;
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
module.exports.getTransaction =
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
                if(req.body.from != "settled")
                return cb(null);
                const request = new mssql.Request()
                request.query(
                    request.template`DECLARE @PageNumber AS INT, @RowspPage AS INT SET @PageNumber = ${resultData.pageNum} SET @RowspPage = ${defaultValue.limit} select * from transactions where from_userId = ${req.body.merchantId} AND settled =  ${false} ORDER BY creationDate DESC OFFSET ((@PageNumber) * @RowspPage) ROWS FETCH NEXT @RowspPage ROWS ONLY`,
                    function (err, res) {
                        console.log(err);
                        if (err || !res)
                            return cb("error in finding merchant !")
                        resultData.transactionList = res.recordsets[0];
                        return cb(null);
                    })
            },

            function (cb) {
                if(req.body.from == "settled")
                return cb(null);
                const request = new mssql.Request()
                request.query(
                    request.template`DECLARE @PageNumber AS INT, @RowspPage AS INT SET @PageNumber = ${resultData.pageNum} SET @RowspPage = ${defaultValue.limit} select * from transactions where from_userId = ${req.body.merchantId} AND isArchived= ${true} ORDER BY creationDate DESC OFFSET ((@PageNumber) * @RowspPage) ROWS FETCH NEXT @RowspPage ROWS ONLY`,
                    function (err, res) {
                        console.log(err);
                        if (err || !res)
                            return cb("error in finding merchant !")
                        resultData.transactionList = res.recordsets[0];
                        return cb(null);
                    })
            },
            function (cb) { 
                if(req.body.from != "settled")
            return cb(null);
                const request = new mssql.Request()
                request.query(
                    request.template`SELECT COUNT(*) AS NumberOfProducts FROM transactions  where from_userId = ${req.body.merchantId} AND settled =  ${false}`,
                    function (err, res) {
                        
                    if (err || !res)
                        return cb("error in count merchants !")
                    resultData.count = res.recordsets[0][0].NumberOfProducts;
                    return cb(null);
                })
            },
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`SELECT COUNT(*) AS NumberOfProducts FROM transactions  where from_userId = ${req.body.merchantId} AND isArchived = ${true}`,
                    function (err, res) {
                        
                    if (err || !res)
                        return cb("error in count merchants !")
                    resultData.count = res.recordsets[0][0].NumberOfProducts;
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