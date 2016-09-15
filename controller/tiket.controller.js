var Ticket = require('../model/ticket.model');
var UserService = require('../service/user.service');
var CryptoUtil = require('../util/crypto.util');
var Mail = require('../service/mail.service')

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
			var t = new Ticket(req.body);
			t.save(function(err){
				if(err) throw err;
				resp.end();
				Mail.sendMail(t);
			});
		}, function(err) {
			resp.status(404);
			resp.end();
		});
	});
}
