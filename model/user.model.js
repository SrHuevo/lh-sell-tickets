var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var CryptoUtil = require('../util/crypto.util');

var userSchema = new Schema({
    mail:String,
    pass:String,
    site:Number,
    permisionLevel:Number
});

userSchema.pre('save', function(next, done){
    this.pass = CryptoUtil.encrypPass(this.pass);
    next();
    done();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
