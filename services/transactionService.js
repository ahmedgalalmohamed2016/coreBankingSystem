const async = require('async');
const mongoose = require('mongoose');
//database tables--------------------------------
const merchantModel = require('../models/merchant.model');
const UserModel = require('../models/user.model');
const CardModel = require('../models/card.model');
const TransactionModel = require('../models/transaction.model');
//end of database tables-------------------------
const statusCode = require('../config/statusError').statusCode;

module.exports.create =
    function (req, callback) {
        var resultData = {};
        async.series([
            function (cb) {
                TransactionModel.create({
                    creationDate: new Date(),
                    from_userId: req.body.fromId,
                    to_userId: req.body.toId,
                    cardId: req.body.cardId,
                    amount: req.body.amount,
                    currency: req.body.currency,
                    status: req.body.status,
                    sourceType: req.body.sourceType,
                    sourceId: req.body.sourceId,
                    sourceData: req.body.sourceData,
                    comment: req.body.comment || "",
                    paymentMethod: req.body.paymentMethod,
                    code: req.body.code,
                    isArchived: req.body.isArchived,
                    settled: req.body.settled
                },
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