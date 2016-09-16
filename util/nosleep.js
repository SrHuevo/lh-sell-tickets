
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
