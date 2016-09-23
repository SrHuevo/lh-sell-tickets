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
    securityCode: Number,
    sendState: String,
    pay: Boolean,
    delete: Boolean
});

var Ticket = mongoose.model('Ticket2', ticketSchema);

ticketSchema.pre('save', function(next, done){
    if(!this.sellDate)
        this.sellDate = new Date();
    if(!this.sendState)
        this.sendState = 'Intentándolo';
    if(!this.changeDate)
        this.changeDate = new Date();
    if(!this.securityCode)
        this.securityCode = Math.random();
    if(!this.delete)
        this.delete = false;
    if(!this.pay)
        this.pay = false;
    if(!this.use)
        this.use = false;
    next();
    done();
});

ticketSchema.pre('update', function(next, done){
    this.changeDate = new Date();
    next();
    done();
});
module.exports = Ticket;
