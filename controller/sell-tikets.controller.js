var Competitor = require('../model/competitor.model');
var UserService = require('../service/user.service');

module.exports.controller = function(app) {
	app.get('/api/sell', function(req, resp){
		UserService.isPassCorrect(UserService.decrypAuthorization(req.get('Authorization')), function(){
			Competitor.find({}, function(err, competitors) {
				if (err) throw err;
				resp.write(JSON.stringify(competitors));
				resp.end();
			});
		}, function(err) {
			resp.status(404);
			resp.end();
		});
	});

	app.put('/api/sell', function(req, resp) {
		UserService.isPassCorrect(UserService.decrypAuthorization(req.get('Authorization')), function() {
			console.log(req.body);
			var c = new Competitor(req.body);
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
