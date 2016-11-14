$(document).ready(function () {

	var param = {};
	var obj = {};
	obj.status = '成功';

	param.jsonData = JSON.stringify(obj);

	$.ajax({
		url: "item_list.json",
		//url: "http://twmac.no-ip.com/item_list.json",
		type: "GET",
		data: param
	})
	.success(function (data) {
		$.each(data.projectItemList, function (index, d) {
			item_lists = "<section class='col-sm-6 col-md-4 col-lg-3'>";
			item_lists += "<div class='card'><a href='" + d.url + "' target='_blank'>";
			item_lists += "<div class='img-size'><img src='" + d.img + "'></div>";
			item_lists += "<header><time><i class='fa fa-calendar'></i> " + d.date + "</time><h1>" + d.title + "</h1></header></a>";
			item_lists += "</div></section>";
			$('#items-containter').append(item_lists);
		});
	})
	.done(function () {
		$("#loading").hide();
	})
	.error(function (data) {
		alert("ERROR:  " + data);
	});
});

// .jSlider Scroll to top
// browser window scroll (in pixels) after which the "back to top" link is shown
var offset = 150,
//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
offset_opacity = 1200,
//duration of the top scrolling animation (in ms)
scroll_top_duration = 700,
//grab the "back to top" link
$back_to_top = $('.jSlider');

//hide or show the "back to top" link
$(window).scroll(function(){
	( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
	if( $(this).scrollTop() > offset_opacity ) { 
		$back_to_top.addClass('cd-fade-out');
	}
});

// Smooth scroll to top
$back_to_top.on('click', function(event){
	event.preventDefault();
	$('body,html').animate({
		scrollTop: 0 ,
		}, scroll_top_duration
	);
});