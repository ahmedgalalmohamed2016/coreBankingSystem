const cardService = require('../services/cardService');

exports.addCard = async(req, res) => {
    cardService.addCard(req, function (err, resualt) {
        if (err)
            return res.send(err)
        return res.send(resualt);
    })
}
exports.list = async(req, res) => {
    cardService.list(req, function (err, resualt) {
        if (err)
            return res.send(err)
        return res.send(resualt);
    })
}