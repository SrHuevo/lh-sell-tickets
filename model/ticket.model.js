var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    user:{},
    name:String,
    mail:String,
    inmortal:Number,
    sellDate:Date,
    changeDate:Date
});

var Ticket = mongoose.model('Ticket', ticketSchema);

ticketSchema.pre('save', function(next, done){
    this.sellDate = new Date();
    this.changeDate = new Date();
    next();
    done();
});
module.exports = Ticket;
