var http = require("http");
var helper = {};

helper.returnLimit = function(num) {
	return "&limit="+num;
}

helper.processSearch = function(str) {
	return str.trim()
		.replace(/\s{2,}/g, ' ')
		.replace(/&/g, '&amp;')
		.replace(/</g, '')
		.replace(/"/g, '')
		.replace(/'/g, '');
}

helper.fixedEncodeURIComponent = function(str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
		return '%' + c.charCodeAt(0).toString(16);
	});
}

//total, needed
//returns an array of random indexes
helper.randomSelector = function(full_length,needed) {
	var arr = [];

	while(arr.length < needed) {
		var randomnumber = Math.ceil(Math.random()*(full_length-1));
		var found = false;
		for(var i=0;i<arr.length;i++){
			if(arr[i] == randomnumber) {
				found = true;
				break
			}
		}
		if(!found) {
			arr[arr.length] = randomnumber;
		}
	}
	return arr;
}

helper.http_gifs = function(urlPath, callback) {
	return http.get(urlPath, function(resp) {
    	var bodyChunks = [];
    	resp.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = JSON.parse(Buffer.concat(bodyChunks));
			callback(body);
		})
    });
}

module.exports = helper;