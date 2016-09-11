var Competitor = require('../model/competitor.model');

module.exports.controller = function(app) {
	app.get('/api/venta', function(req, resp){
		console.log("Venta: get");
		Competitor.find({}, function(err, competitors) {
			if (err) throw err;
			resp.write(JSON.stringify(competitors));
			resp.end();
		});
	});

	app.put('/api/venta', function(req, resp) {
		var c = new Competitor(req.body);
		c.save(function(err){
			if(err) throw err;
			resp.end();
		});
	});

	app.post('/api/venta', function(req, resp) {
		console.log('sell-tikets: post');
		resp.end();
	});
}
