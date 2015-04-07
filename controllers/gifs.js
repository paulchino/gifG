var http = require("http");
var helper = require("./helpers.js");

module.exports = (function() {
	return {
		get_gifs: function(req, res) {
			//console.log
			var search = helper.processSearch(req.body.search);
			var uriSearch = helper.fixedEncodeURIComponent(search);

			var api_key = "&api_key=dc6zaTOxFJmzC";
			var rating = "&rating=pg-13";
			var returnLimit = "&limit=3";

			var urlPath = "http://api.giphy.com/v1/gifs/search?q=" + uriSearch + returnLimit + rating + api_key;

			var req = http.get(urlPath, function(resp) {
				// console.log('STATUS: '+ res.statusCode);
				// console.log('HEADERS: ' + JSON.stringify(resp.headers));
				var bodyChunks = [];
				resp.on('data', function(chunk) {
				    bodyChunks.push(chunk);
				  }).on('end', function() {
				    var body = JSON.parse(Buffer.concat(bodyChunks));
				    //console.log(body);
				    //console.log(body.data.length);

				    if (body.data.length > 16) {
				    	var gifs = [];
				    	var random = helper.randomSelector(body.data.length);
				    	for (var i = 0; i < random.length; i++) {
				    		gifs.push(body.data[random[i]]);
				    	}

				    	res.render('gallery', { gif: gifs });
				    } else {
				    	//body.data is an array
				    	//console.log(body.data);
				    	res.render('gallery', {gif: body.data});
				    }
				})
			});
			req.on('error', function(e) {
				console.log("ERROR: " + e.message);
			})
			req.end();
		}
	}

})();
