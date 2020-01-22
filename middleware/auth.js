const _ = require('lodash');

exports.mainAuth = async function(req, res, next) {
    try {
        return next()
    } catch (err) {
        return res.status(401).send("You need to login to access this page");
    }
}