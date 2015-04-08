//------ Waits till images are loaded before 'repacked'
//--- otherwise images will be tiled over each otherå
var link_cache = {
	full_link: ""
};

function imgAfterLoad($container) {
	$("body").css("cursor", "wait" );
	$("#add-form, #back-link, .info-btn").css("visibility","hidden");
	$(".waiting").html("loading...please wait until images are layed out");

	var imgLoad = imagesLoaded($container);
	imgLoad.on('always', function(instance) {
		$('.img-item').removeClass('hidden');
		$container.packery();
		defaultStatus();
		$("#add-form, #back-link, .info-btn").css("visibility", "visible");
		$("#add-waiting h5").html("");
	})
} 

function defaultStatus() {
	$("body").css("cursor", "default");
	$(".waiting").html("");
	$(".waiting_img").hide();
}

function draggable($container) {
	var $itemElems = $container.find('.img-item');
	$itemElems.draggable();
	$container.packery( 'bindUIDraggableEvents', $itemElems );
}

function getIdsforURL() {
	var link = "http://www.gifg.io/search/";
	$('.img-item').each(function(e) {
		link += "&" + $(this).attr('data');
	})
	if (link != link_cache.full_link) {
		$('#gif-link').empty();
		link_cache.full_link = link;
		$.ajax({
			url: '/link_short',
			type: 'post',
			data: { full_link: link },
		}).done(function(res){
			if (res.short_url) {
				var str = "<h3><a href='" + res.short_url +"'>" + res.short_url + "</a></h3>";
			} else {
				var str = "There was an error. Try again.";
			}
			$('#gif-link').append(str);	
		})
	} else {
		console.log('same link, no need to update')
	}
};

$(document).ready(function() {
	$("body").css("cursor", "wait");

	var $container = $('#container').packery({
		itemSelector: '.img-item',
		gutter: 4
  	});

  	//load inital image and make draggable
	imgAfterLoad($container);
	draggable($container);

//------- add gif ajax request to route which uses an http request
	$('#add-form').on('submit', function() {
		$("body").css("cursor", "wait");
		$("#add-form, #back-link, .info-btn").css("visibility","hidden");
		$("#add-waiting h5").html("loading...");
		$.ajax({
			url: $(this).attr('action'),
			type: 'post',
			data: $(this).serialize()
		}).done(function(res){
			var str = ""
			for(var i=0; i<res.gif.length; i++) {
				str+= "<img class='img-item hidden' data='" + res.gif[i].id + "' src=' " + res.gif[i].images.fixed_width.url + "'>";
			}
			$str = $(str);
			$container.prepend($str).packery('prepended', $str);

			$(".waiting").hide();
			imgAfterLoad($container);
			draggable($container);

			$("#search").val("");
		})
		return false;
	})

//------- determines if single of double click
//--- single click = remove gif, double click = copy
	var DELAY = 700, clicks = 0, timer = null;
	$container.on('click','.img-item', function(event) {
		clicks++;
        if(clicks === 1) {
            timer = setTimeout(function() {
                var removegif = confirm('Remove Gif?');
	 			if (removegif) {
	 				$container.packery('remove', event.target);
	 				$container.packery();
	 			}   
                clicks = 0;    //after action performed, reset counter
            }, DELAY);
        } else {
            clearTimeout(timer);    //prevent single-click action
            var copy = $(this).clone();
            $container.prepend(copy).packery('prepended', copy);
			imgAfterLoad($container);
			draggable($container);
			clicks = 0; //after action performed, reset counter
            }  
    })
    .on("dblclick", function(e){
    	e.preventDefault();  //cancel system double-click event
    });

	$('.btn-lightbulb').click(function() {
		$('body').toggleClass("darkbackground");
	});

	$('.hide-btn').click(function() {
		$('#add-form').toggle();
		$('.back-link').toggle();
		$('#back-link button').toggle();
	});

	$('.btn-send').click(function() {
		getIdsforURL();
	})
})