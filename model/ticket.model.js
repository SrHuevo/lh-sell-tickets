var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    name:String,
    mail:String,
    inmortal:Number,
    sellDate:Date,
    changeDate:Date
});

var Competitor = mongoose.model('Competitor', ticketSchema);

ticketSchema.pre('save', function(next, done){
    num++;
    this.num = num;
    next();
    done();
});
module.exports = Competitor;
