const merchantService = require('../services/merchantService');
const statusCode = require('../config/statusError').statusCode;



exports.welcome = async (req, res) => {
    return res.send({ statusCode: statusCode.oK, message: "Welcome to core banking system ."});
}

exports.createMerchant = async (req, res) => {
    merchantService.createMerchant(req, function (err, resualt) {
        if (err)
            return res.send({ statusCode: statusCode.badRequest, message: err })
        return res.send({ statusCode: statusCode.oK, message: "success", data: resualt });
    })
}
exports.merchantList = async (req, res) => {
    merchantService.merchantList(req, function (err, resualt) {
        if (err)
            return res.send({ statusCode: statusCode.badRequest, message: err })
        return res.send({ statusCode: statusCode.oK, message: "success", data: resualt });
    })
}