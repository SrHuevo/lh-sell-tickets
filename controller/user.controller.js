var User = require('../model/user.model');
var UserService = require('../service/user.service');
var CryptoUtil = require('../util/crypto.util');

module.exports.controller = function(app) {
	app.get('/api/user', function(req, resp){
        UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function() {
    		resp.end();
        }, function(err) {
            resp.status(401);
            resp.end();
        });
	});

	app.put('/api/user', function(req, resp) {
        UserService.isPassCorrect(CryptoUtil.decrypAuthorization(req.get('Authorization')), function() {
    		var u = new User(req.body);
			console.log("usuario: " + u);
    		u.save(function(err){
    			if(err) throw err;
    			resp.end();
    		});
        }, function(err) {
            resp.status(403);
            resp.write(err);
            resp.end();
        });
	});
}
