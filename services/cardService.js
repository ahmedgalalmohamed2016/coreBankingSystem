const async = require('async');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
//database tables--------------------------------
const mssql = require('mssql');
//end of database tables-------------------------

const helperFunction = require('../services/helperFunctions');
const defaultValue = require('../config/defaultValues').values;
const statusCode = require('../config/statusError').statusCode;

module.exports.addCard =
    function (req, callback) {
        var resultData = { newUser: false, newMerchant: false };
        async.series([
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`select * from userData where userId=${req.body.userId}`,
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
                const request = new mssql.Request()
                request.query(
                    request.template`select * from card where encCardnumber=${req.body.cardNum}`,
                    function (err, res) {
                        if (err)
                            return cb({ statusCode: statusCode.badRequest, message: "cannot find card for this user" });
                        if (res.length >= 1)
                            return cb({ statusCode: statusCode.created, message: "this user already have the same card" });
                        return cb(null);
                    })
            },
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`INSERT INTO card (creationDate,userId,cardNumber,encCardnumber,expireMonth,expireYear,holderName,isDeleted) VALUES (${new Date()},${req.body.userId},${req.body.cardNum},${resultData.encCardnumber},${req.body.expireMonth},${req.body.expireYear},${req.body.holderName},${false})`,
                    function (err, res) {
                        console.log(err);
                        
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
                return callback(null, { statusCode: resultData.statusCode, message: resultData.message, data: {} });
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
                const request = new mssql.Request()
                request.query(
                    request.template`DECLARE @PageNumber AS INT, @RowspPage AS INT SET @PageNumber = ${resultData.pageNum} SET @RowspPage = ${defaultValue.limit} SELECT * FROM card where userId = ${req.body.userId} ORDER BY creationDate DESC OFFSET ((@PageNumber) * @RowspPage) ROWS FETCH NEXT @RowspPage ROWS ONLY`,
                    function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "error in finding merchant !" })
                        resultData.userCardList = res.recordsets[0];
                        return cb(null);
                    })
                
            },
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`SELECT COUNT(*) AS NumberOfProducts FROM card where userId = ${req.body.userId};`,
                    function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "error in finding merchant !" })
                        resultData.count = res.recordsets[0][0].NumberOfProducts;
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