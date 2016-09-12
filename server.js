var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://'+process.env.URI_MONGO_LHST, {user:process.env.USER_MONGO_LHST, pass:process.env.PASS_MONGO_LHST});

var app = express();
app.use(bodyParser.json());
app.use(express.static('view'));

// dynamically include routes (Controller)
fs.readdirSync('./controller').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      var route = require('./controller/' + file);
      route.controller(app);
  }
});
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});


var port = process.env.PORT || 8080;
app.listen(port);




//Heroku free no sleep
var http = require('http');

var min = 300000;
var max = 600000;
// and the formula is:
var random = function(){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
setInterval(function(){
	http.get(process.env.URI_SERVER, function(res) {
	  console.log('STATUS: ' + res.statusCode);
  });
}, random());


exports.connection = connection;
