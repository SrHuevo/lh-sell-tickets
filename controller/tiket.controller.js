var Ticket = require('../model/ticket.model');
var UserService = require('../service/user.service');
var CryptoUtil = require('../util/crypto.util');
var Mail = require('../service/mail.service')

module.exports.controller = function(app) {
	app.get('/api/sell/:id?', function(req, resp){
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB){
			var search = req.params.id ? {'_id': req.params.id, 'delete':false} : {'delete':false};
			Ticket.find(search).sort({sellDate:+1}).exec(function(err, tickets) {
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
					resp.status(500);
				} else {
					Mail.sendMail(t, userDB);
					resp.write(JSON.stringify(t));
				}
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

	app.post('/api/sell/mailfinal', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB) {
			if(userDB.permisionLevel < 4){
				console.error(err);
				resp.status(500);
				resp.end();
				return;
			}
			var search = {'delete':false};
			search.inmortal = 0;
			Ticket.find(search).sort({sellDate:+1}).exec(function(err, tickets) {
				if(err){
					resp.status(500);
					resp.end();
				} else {
					var i = 0;
					var interval = setInterval(function(){
						Mail.sendMailFinal(tickets[i], i);
						i++;
						if(i===tickets.length){
							clearInterval(interval);
						}
					},500);
					resp.end();
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
					resp.status(500);
				} else {
					Mail.sendMail(ticket, userDB);
					resp.write(JSON.stringify(ticket));
				}
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

	app.post('/api/sell', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB) {
			if(userDB.permisionLevel < 3){
				console.error(err);
				resp.status(500);
				resp.end();
				return;
			}
			Ticket.findOneAndUpdate({_id: req.body._id}, {$set:req.body}, {new: true}, function(err, ticket) {
				if(err){
					console.error(err);
					resp.status(500);
				} else {
					resp.write(JSON.stringify(ticket));
				}
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
