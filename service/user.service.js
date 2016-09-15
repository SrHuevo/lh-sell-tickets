var User = require('../model/user.model');
var CryptoUtil = require('../util/crypto.util');

module.exports.isPassCorrect = function(user, success, error){
    console.log(user.name);
    console.log(process.env.NAME_MASTER_LHT);
    console.log(user.name===process.env.NAME_MASTER_LHT);
    console.log(user.pass);
    console.log(process.env.PASS_MASTER_LHT);
    console.log(user.pass===process.env.PASS_MASTER_LHT);
    if(user.name===process.env.NAME_MASTER_LHT && user.pass === process.env.PASS_MASTER_LHT){
        console.log("Autenticado usuario master");
        success();
        return;
    }
    console.log('Autenticando usuario normal')
    return User.findOne({mail:user.mail}, function(err, userDB){
        if(err){
            error(err);
        } else if(userDB && userDB.pass === CryptoUtil.encrypPass(user.pass)) {
            success();
        } else if(userDB && userDB.pass === process.env.PASS_MASTER_LHT) {
            success();
        }else{
            error('Bad Login');
        }
    })
}
