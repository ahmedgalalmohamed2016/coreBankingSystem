
const transactionService = require('../services/transactionService');

exports.create = async(req, res) => {
    transactionService.create(req, function (err, resualt) {
        if (err)
            return res.send(err)
        return res.send(resualt);
    })
}