var helper = {};

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

helper.randomSelector = function(num) {
	var arr = [];

	while(arr.length < 16) {
		var randomnumber = Math.ceil(Math.random()*(num-1));
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




module.exports = helper;