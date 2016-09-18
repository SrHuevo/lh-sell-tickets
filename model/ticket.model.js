var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    user: String,
    name: String,
    mail: String,
    inmortal: Number,
    sellDate: Date,
    use: Boolean,
    changeDate: Date,
    securityCode: Number
});

var Ticket = mongoose.model('Ticket', ticketSchema);

ticketSchema.pre('save', function(next, done){
    this.sellDate = new Date();
    this.changeDate = new Date();
    this.securityCode = Math.random();
    next();
    done();
});
module.exports = Ticket;
