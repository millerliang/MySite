var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 256,
	'tolerance': 70
});

slideout.on('beforeopen', function() {
	document.querySelector('.fixed').classList.add('fixed-open');
	document.querySelector('.ninja-btn').classList.add('active');
	document.querySelector('.panel-footer').classList.add('this_hidden');
});

slideout.on('beforeclose', function() {
	document.querySelector('.fixed').classList.remove('fixed-open');
	document.querySelector('.ninja-btn').classList.remove('active');
	document.querySelector('.panel-footer').classList.remove('this_hidden');
});

$('.menu-section label').click(function() {
  $(this).toggleClass('active');
});

$('.ninja-btn').click(function () {
	slideout.toggle();
	//$(this).toggleClass('active');
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
$header_item_top = $('.header_item');
$footer_item_bottom = $('.panel-footer');
$command_go_bottom = $('.command_input');

//hide or show the "back to top" link
$(window).scroll(function(){
	( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
	( $(this).scrollTop() > offset ) ? $header_item_top.addClass('header_item_hidden') : $header_item_top.removeClass('header_item_hidden');
	( $(this).scrollTop() > offset ) ? $footer_item_bottom.addClass('footer_hidden') : $footer_item_bottom.removeClass('footer_hidden');
	( $(this).scrollTop() > offset ) ? $command_go_bottom.addClass('command_input_down') : $command_go_bottom.removeClass('command_input_down');
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