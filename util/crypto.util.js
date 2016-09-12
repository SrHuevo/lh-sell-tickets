var crypto = require('crypto');
var shasum = crypto.createHash('sha1');

module.exports.decrypAuthorization = function(header){
    var base64 = header.substr('Basic '.length);
    var ascii = new Buffer(base64, 'base64').toString('ascii');
    return {
        mail: ascii.substr(0, ascii.indexOf(':')),
        pass: ascii.substr(ascii.indexOf(':') + 1)
    }
}

module.exports.encrypAuthorization = function(user){
    return 'Basic ' + new Buffer(user.mail + ':' + user.pass).toString('base64');
}

module.exports.encrypPass = function(pass){
    return shasum.update(pass).digest('hex');
}
