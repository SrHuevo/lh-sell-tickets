require('util/nosleep.js');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://'+process.env.URI_MONGO_LHT, {user:process.env.USER_MONGO_LHT, pass:process.env.PASS_MONGO_LHT});

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
