//var http = require("http");
var helper = require("./helpers.js");
//api keys required for giphy and google link shortener
var key = require("./keys.js");
var googl = require('goo.gl');

googl.setKey(key.google_link);
googl.getKey();

module.exports = (function() {
	return {
		link_short: function(req, res) {
			googl.shorten(req.body.full_link)
			    .then(function (shortUrl) {
			        res.send({short_url: shortUrl});
			    })
			    .catch(function (err) {
			        res.send({error: err.message});
			    });
		},

		add_gifs: function(req, res) {
			var search = helper.processSearch(req.body.search);
			var uriSearch = helper.fixedEncodeURIComponent(search);
			var urlPath = "http://api.giphy.com/v1/gifs/search?q=" + uriSearch + helper.returnLimit(20) + "&" + key.giphy;

			helper.http_gifs(urlPath, function(body) {
				var gifs = [];
				var random = helper.randomSelector(body.data.length, 3);
				for(var i = 0; i<random.length; i++) {
					gifs.push(body.data[random[i]]);
				}
				res.send({gif: gifs});				
			})
		},

		get_gifs: function(req, res) {
			var search = helper.processSearch(req.body.search);
			var uriSearch = helper.fixedEncodeURIComponent(search);
			var urlPath = "http://api.giphy.com/v1/gifs/search?q=" + uriSearch + helper.returnLimit(30) + "&" + key.giphy;

			helper.http_gifs(urlPath, function(body) {
				if (body.data.length > 10) {
			    	var gifs = [];
			    	var random = helper.randomSelector(body.data.length,10);
			    	for (var i = 0; i < random.length; i++) {
			    		gifs.push(body.data[random[i]]);
			    	}
			    	res.render('gallery', { gif: gifs });
			    } else {
			    	res.render('gallery', {gif: body.data});
			    }
			})
		}, 

		url_gifs: function(ids, res) {
			var limitArr = [];
			var idArr = ids.split('&');
			idArr.shift();

			//limits the send gifs to 16
			var min = Math.min(idArr.length, 16);
			for (var i = 0 ; i < min ; i++) {
				limitArr.push(idArr[i]);
			}

			var str = "";
			for (var i =0; i<limitArr.length; i++) {
				str += "," + limitArr[i];
			}
			str = str.replace(",","");
			console.log(str);
			var urlPath = "http://api.giphy.com/v1/gifs?" + key.giphy + "&ids=" + str;

			helper.http_gifs(urlPath, function(body) {
				res.render('gallery', {gif: body.data});
			})			
		}
	}
})();

			// var req = http.get(urlPath, function(resp) {
			// 	var bodyChunks = [];
			// 	resp.on('data', function(chunk) {
			// 	    bodyChunks.push(chunk);
			// 	  }).on('end', function() {
			// 	    var body = JSON.parse(Buffer.concat(bodyChunks));
			// 	    	res.render('gallery', {gif: body.data});
			// 	})
			// });
			// req.on('error', function(e) {
			// 	console.log("ERROR: " + e.message);
			// })
			// req.end();

// unused code 
//add_gifs
			// var req = http.get(urlPath, function(resp) {
			// 	var bodyChunks = [];
			// 	resp.on('data', function(chunk) {
			// 	    bodyChunks.push(chunk);
			// 	  }).on('end', function() {
			// 	    var body = JSON.parse(Buffer.concat(bodyChunks));
			// 	    var gifs = [];
			// 	    var random = helper.randomSelector(body.data.length, 3);
			// 	    for(var i = 0; i<random.length; i++) {
			// 	    	gifs.push(body.data[random[i]]);
			// 	    }
			// 	    res.send({gif: gifs});
			// 	})
			// })
//get_gifs
		// 	var req = http.get(urlPath, function(resp) {
		// 		var bodyChunks = [];
		// 		resp.on('data', function(chunk) {
		// 		    bodyChunks.push(chunk);
		// 		  }).on('end', function() {
		// 		    var body = JSON.parse(Buffer.concat(bodyChunks));
		// 		    if (body.data.length > 10) {
		// 		    	var gifs = [];
		// 		    	//number of gifs init loaded
		// 		    	var random = helper.randomSelector(body.data.length,10);
		// 		    	for (var i = 0; i < random.length; i++) {
		// 		    		gifs.push(body.data[random[i]]);
		// 		    	}
		// 		    	res.render('gallery', { gif: gifs });
		// 		    } else {
		// 		    	res.render('gallery', {gif: body.data});
		// 		    }
		// 		})
		// 	});
		// 	req.on('error', function(e) {
		// 		console.log("ERROR: " + e.message);
		// 	})
		// 	req.end();
		// },
//url_gifs
			// var req = http.get(urlPath, function(resp) {
			// 	var bodyChunks = [];
			// 	resp.on('data', function(chunk) {
			// 	    bodyChunks.push(chunk);
			// 	  }).on('end', function() {
			// 	    var body = JSON.parse(Buffer.concat(bodyChunks));
			// 	    	res.render('gallery', {gif: body.data});
			// 	})
			// });
			// req.on('error', function(e) {
			// 	console.log("ERROR: " + e.message);
			// })
			// req.end();


