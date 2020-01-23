

const _ = require("lodash");
const request = require("superagent");
var fs = require("fs");
const mongoose = require('mongoose');
const merchantService = require('../services/merchantService');
exports.welcome = async (req, res) => {
    return res.send({ statusCode: 200, message: "success", data: {} });
}

exports.createMerchant = async (req, res) => {
    merchantService.createMerchant(req, function (err, resualt) {
        if (err)
            return res.send({ statusCode: 400, message: err })
        return res.send({ statusCode: 200, message: "success", data: resualt });
    })
}