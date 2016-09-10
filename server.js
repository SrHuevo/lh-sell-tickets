var express = require('express');
var bodyParser = require('body-parser');
var sellTikets = require('./controller/sell-tikets');
var redirect = require('./controller/redirect');

var app = express();
var port = process.env.PORT || 8080;

app.get('/api/venta', sellTikets.get);
app.post('/api/venta', sellTikets.post);
app.get('/*', redirect.get);

app.listen(port);

var http = require('http');
var options = [{
  host: 'lh-sell-tickets.herokuapp.com'
}];

var min = 60000;
var max = 600000;
// and the formula is:
var random = function(){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
setInterval(function(){
	options.forEach(function(e){
		http.get(e, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		});
	});
}, random());
