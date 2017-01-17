// Head Star//
head_items = "<meta http-equiv='X-UA-Compatible' content='IE=edge'>";
head_items += "<meta http-equiv='cleartype' content='on'>";
head_items += "<meta name='MobileOptimized' content='320'>";
head_items += "<meta name='HandheldFriendly' content='True'>";
head_items += "<meta name='apple-mobile-web-app-capable' content='yes'>";
head_items += "<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'>";
head_items += "<link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN' crossorigin='anonymous'>";
head_items += "<link rel='stylesheet' href='asset/css/main.css'>";
$('head').append(head_items);
// Head End//

// Menu Star//
menu_items = "<header class='slide_logo'><a href='index.html'><img src='asset/images/slide_logo.png'></a></header>";
menu_items += "<div class='slide_user'><a href='user_profile.html'><img src='asset/croppie/demo/cat.jpg'></a><h3>Allen lee</h3><a href='login.html'><i class='fa fa-sign-out'></i></a></div>";
menu_items += "<section class='menu-section'>";
menu_items += "<label class='menu-section-title'><i class='fa fa-home'></i> <a href='index.html'>首頁 <small>Home</small></a></label>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<label for='items' class='menu-section-title'>";
menu_items += "<i class='fa fa-th'></i> 项目 <small>items</small>";
menu_items += "<i class='fa fa-angle-right'></i>";
menu_items += "</label>";
menu_items += "<input class='sh-state' id='items' type='checkbox' />";
menu_items += "<ul class='menu-section-list sh-modal'>";
menu_items += "<li><a href=''>在线项目</a></li>";
menu_items += "<li><a href='form.html'>发起项目</a></li>";
menu_items += "<li><a href='form.html'>发起路演</a></li>";
menu_items += "</ul>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<label for='luAnn' class='menu-section-title'>";
menu_items += "<i class='fa fa-calendar-check-o'></i> 路演 <small>LuAnn</small>";
menu_items += "<i class='fa fa-angle-right'></i>";
menu_items += "</label>";
menu_items += "<input class='sh-state' id='luAnn' type='checkbox' />";
menu_items += "<ul class='menu-section-list sh-modal'>";
menu_items += "<li><a href=''>大厅</a></li>";
menu_items += "<li><a href=''>今日</a></li>";
menu_items += "<li><a href=''>重播</a></li>";
menu_items += "<li><a href=''>報名</a></li>";
menu_items += "<li><a href=''>我的</a></li>";
menu_items += "</ul>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<h3 class='menu-section-title'><i class='fa fa-bullhorn'></i> <a href='news.html'>消息 <small>News</small></a>";
menu_items += "<span class='notice'>0</span></h3>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<h3 class='menu-section-title'><i class='fa fa-calendar'></i> <a href='activity-list.html'>活动 <small>Activity</small></a></h3>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<label for='member' class='menu-section-title'>";
menu_items += "<i class='fa fa-user'></i> 会员 <small>Member</small>";
menu_items += "<i class='fa fa-angle-right'></i>";
menu_items += "</label>";
menu_items += "<input class='sh-state' id='member' type='checkbox' />";
menu_items += "<ul class='menu-section-list sh-modal'>";
menu_items += "<li><a href=''>我的活动</a></li>";
menu_items += "<li><a href=''>我的投资</a></li>";
menu_items += "<li><a href=''>我的融资</a></li>";
menu_items += "<li><a href=''>我的路演</a></li>";
menu_items += "<li><a href=''>我的收藏</a></li>";
menu_items += "<li><a href='notice.html'>我的通知 <span class='notice red_bg'>2</span></a></li>";
menu_items += "<li><a href='user_profile.html'>個人设置</a></li>";
menu_items += "</ul>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<h3 class='menu-section-title'><i class='fa fa-usd'></i> <a href=''>投资者 <small>Investment</small></a></h3>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<h3 class='menu-section-title'><i class='fa fa-file-text-o'></i> <a href='doc_swiper.html'>文件 <small>Docs</small></a></h3>";
menu_items += "</section>";
menu_items += "<section class='menu-section'>";
menu_items += "<h3 class='menu-section-title'><i class='fa fa-android'></i> <a href=''>APP下载 <small>Download</small></a></h3>";
menu_items += "</section>";
$('#menu').append(menu_items);
// Menu End//

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