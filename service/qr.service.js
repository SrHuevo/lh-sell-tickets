var request = require('request').defaults({ encoding: null });

module.exports.getQR = function(ticket, success, fail){
    var uri = 'http://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
    console.log(ticket);
    request.get(uri+JSON.stringify(ticket), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            success(new Buffer(body).toString('base64'));
        } else {
            fail();
        }
    });
}
