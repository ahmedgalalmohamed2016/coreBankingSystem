module.exports.coreBank = function (statusCode, messageTitle, data) {
    var req = this.req;
    var res = this.res;
    var results, message;

        message = messageTitle;


    if (!data)
        results = ({ statusCode: statusCode, message: message });
    else
        results = ({ statusCode: statusCode, message: message, data: data });

   
    return res.sent(results);
}