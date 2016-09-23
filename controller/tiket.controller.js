var Ticket = require('../model/ticket.model');
var UserService = require('../service/user.service');
var CryptoUtil = require('../util/crypto.util');
var Mail = require('../service/mail.service')

module.exports.controller = function(app) {
	app.get('/api/sell/:id?', function(req, resp){
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB){
			var search = req.params.id ? {'_id': req.params.id, 'delete':false} : {'delete':false};
			console.log(search);
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
					resp.status(500);
				} else {
					Mail.sendMail(t, userDB);
					console.log('creando ticket: ' + t)
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

	app.post('/api/sell/:ticketId', function(req, resp) {
		UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function(userDB) {
			Ticket.findOneAndUpdate({_id: req.params.ticketId}, {$set:{sendMail:'Intentándolo'}}, {new: true}, function(err, ticket) {
				if(err){
					console.error(err);
					resp.status(500);
				} else {
					console.log('enviando mail a: ' + ticket);
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
			Ticket.findOneAndUpdate({_id: req.body._id}, {$set:req.body}, {new: true}, function(err, ticket) {
				if(err){
					console.error(err);
					resp.status(500);
				} else {
					console.log('actualizando entrada: ' + ticket);
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
