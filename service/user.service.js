var User = require('../model/user.model');
var CryptoUtil = require('../util/crypto.util');

module.exports.isPassCorrect = function(user, success, error){
    return User.findOne({mail:user.mail}, function(err, userDB){
        if(err){
            error(err);
            return;
        }
        if(userDB && userDB.pass === CryptoUtil.encrypPass(user.pass)){
            success();
        }else{
            error('Bad Login');
        }
    })
}
