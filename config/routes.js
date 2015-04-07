var gif = require("../controllers/gifs.js");

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	})

	app.get('/gallery', function(req, res) {
		res.render('gallery');
	})

	app.post('/search', function(req,res) {
		//console.log(req.body.search);
		//req.end();
		gif.get_gifs(req,res);
		//console.log('in this route');
		//console.log(req.body);
		//want to send this to a controller;
	})
	// app.post('/getGif', function(req, res) {
	// 	gif.get_gifs(req,res);
	// })
}