var Ticket = require('../model/ticket.model');
var UserService = require('../service/user.service');
var CryptoUtil = require('../util/crypto.util');
var Mail = require('../service/mail.service')

module.exports.controller = function(app) {
	app.get('/api/sell', function(req, resp){
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB){
			var search = req.body.id ? {'id': req.body.id, 'delete':false} : {'delete':false};
			Ticket.find(search).sort('-date').exec(function(err, tickets) {
				if(err){
					resp.status(500);
					resp.end();
				} else {
					resp.write(JSON.stringify(tickets));
					resp.end();
				}
			});
		}, function(err) {
			resp.status(401);
			resp.end();
		});
	});

	app.put('/api/sell', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB) {
			var t = new Ticket(req.body);
			t.user = userDB.mail;
			t.save(function(err){
				if(err){
					console.error(err);
					resp.status(403);
					resp.end();
				} else {
					resp.end();
					Mail.sendMail(t, userDB);
				}
			});
		}, function(err) {
			if(err){
				resp.status(500);
			} else {
				resp.status(401);
			}
			resp.end();
		});
	});

	app.post('/api/sell/:ticketId', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB) {
			Ticket.findOneAndUpdate({_id: req.params.ticketId}, {$set:{sendMail:'Intentándolo'}}, {new: true}, function(err, ticket) {
				if(err){
					console.error(err);
					resp.status(403);
				}
				Mail.sendMail(ticket, userDB);
				resp.end();
			});
		}, function(err) {
			if(err){
				resp.status(500);
			} else {
				resp.status(401);
			}
			resp.end();
		});
	});

	app.delete('/api/sell/:ticketId', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB) {
			Ticket.findOneAndUpdate({_id: req.params.ticketId}, {$set:{delete:true}}, {new: true}, function(err, doc){
		    	if(err){
					console.error(err);
					resp.status(500);
			    }
				resp.end();
			});
		}, function(err) {
			if(err){
			resp.status(500);
			resp.end(err);
		} else {
			resp.status(401);
			resp.end();
		}
		});
	});
}
