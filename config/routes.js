var gif = require("../controllers/gifs.js");

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/search', function(req, res) {
		res.render('index');
	});

	app.get('/search/:id', function(req, res) {
		gif.url_gifs(req.params.id, res);
	});

	app.post('/search', function(req,res) {
		if (req.body.search == "") {
			res.render('index');
		}
		gif.get_gifs(req,res);
	});

	app.post('/add', function(req, res) {
		console.log(req.body);
		gif.add_gifs(req, res);
	});

	//enable CORS
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.post('/link_short', function(req, res) {
		gif.link_short(req, res);
	});
}