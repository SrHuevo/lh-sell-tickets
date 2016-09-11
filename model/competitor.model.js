var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var competitorSchema = new Schema({
    num:Number,
    name:String,
    mail:String,
    inmortal:Number,
    cod:Number
});

var Competitor = mongoose.model('Competitor', competitorSchema);

//Esto es la mierda pero me vale por que no pinso poner el servidor distribuido.
var num;
Competitor.count(function(err,count){
    if(err) throw err;
    num = count;
})

competitorSchema.pre('save', function(next, done){
    num++;
    this.num = num;
    next();
    done();
});
module.exports = Competitor;
