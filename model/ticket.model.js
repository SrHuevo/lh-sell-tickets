var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    name:String,
    mail:String,
    inmortal:Number,
    sellDate:Date,
    changeDate:Date
});

var Ticket = mongoose.model('Ticket', ticketSchema);

ticketSchema.pre('save', function(next, done){
    next();
    done();
});
module.exports = Ticket;
