var Ticket = require('../model/ticket.model');
var UserService = require('../service/user.service');
var CryptoUtil = require('../util/crypto.util');

module.exports.controller = function(app) {
	app.get('/api/sell', function(req, resp){
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(){
			Ticket.find({}, function(err, tickets) {
				if (err) throw err;
				resp.write(JSON.stringify(tickets));
				resp.end();
			});
		}, function(err) {
			resp.status(404);
			resp.end();
		});
	});

	app.put('/api/sell', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function() {
			console.log(req.body);
			var c = new Ticket(req.body);
			c.save(function(err){
				if(err) throw err;
				resp.end();
			});
		}, function(err) {
			resp.status(404);
			resp.end();
		});
	});
}
