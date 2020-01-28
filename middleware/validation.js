
const requireValue = require('../config/require').require;
const validationRgex = require('../config/validationRegx').validationRgex;
const statusCode = require('../config/statusError').statusCode;

exports.validationSystem = async function (req, res, next) {
    try {
        var apiName = req.originalUrl.replace(/\//g, '_').substr(1);
        for (var i in requireValue[apiName]) {
            if (req.body[i] == undefined && requireValue[apiName][i])
                return res.send({ statusCode: statusCode.badRequest, message: i + " pram is missing !" });
             
            if (req.body[i] != undefined && !validationRgex[i].test(req.body[i]))
                return res.send({ statusCode: statusCode.badRequest, message: "please inter valid " + i });

        }
        if (req.body.cardNum && ['3', '4', '5', '6'].indexOf(req.body.cardNum.charAt(0)) == -1)
              return res.send({ statusCode: statusCode.badRequest,  message: "please enter Valid Card Number"});
        return next()
    } catch (err) {
        return res.status(401).send("You need to login to access this page");
    }
}