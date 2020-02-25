const async = require('async');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
//database tables--------------------------------
const mssql = require('mssql');
//end of database tables-------------------------

module.exports.createMerchant =
    function (req, callback) {
        var resaultData = {};
        async.series([
            function (cb) {
            
                // UserModel.findOne({ userName: req.body.userName },
                //     function (err, res) {
                //         if (err)
                //             return cb("error in getting data")
                //         if (res)
                //             return cb("This userName is already used, please choose another userName.")

                //         return cb(null);
                //     })
            },
        ],
            function (err, res) {
                if (err)
                    return callback(err)
                return callback(null, resaultData.merchantData);
            });
    }