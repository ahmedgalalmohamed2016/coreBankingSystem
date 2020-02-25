const async = require('async');
const mongoose = require('mongoose');
//database tables--------------------------------
const mssql = require('mssql');
//end of database tables-------------------------
const statusCode = require('../config/statusError').statusCode;

module.exports.create =
    function (req, callback) {
        var resultData = {};
        async.series([
            function (cb) {
                const request = new mssql.Request()
                request.query(
                    request.template`INSERT INTO transaction (creationDate,from_userId,to_userId,cardId,amount,currency,status,sourceType,sourceId,sourceData,comment,paymentMethod,code,isArchived,settled) VALUES (${new Date()},${req.body.fromId},${req.body.toId},${req.body.cardId},${req.body.amount},${req.body.currency},${req.body.status},${req.body.sourceType},${req.body.sourceId},${req.body.sourceData},${req.body.comment || ""},${req.body.paymentMethod},${req.body.code},${req.body.isArchived},${req.body.settled})`,
                   function (err, res) {
                        if (err || !res)
                            return cb({ statusCode: statusCode.badRequest, message: "cannot create transaction !" });
                        resultData.transactionData = res;
                        return cb(null);
                    })
            }
        ],
            function (err) {
                if (err)
                    return callback({ statusCode: err.statusCode, message: err.message });
                return callback(null, { statusCode: statusCode.oK, message: "success", data: resultData.transactionData });
            });
    }