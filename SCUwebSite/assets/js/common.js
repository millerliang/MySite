/*---------------------------------------------
	Check User Agent
  ---------------------------------------------*/

var nut = navigator.userAgent.toLowerCase();
var _ua = {
	ie: nut.indexOf("msie") != -1 || nut.indexOf("trident") != -1,
	ie6: nut.indexOf("msie 6") != -1,
	ie7: nut.indexOf("msie 7") != -1,
	ie8: nut.indexOf("msie 8") != -1,
	ie9: nut.indexOf("msie 9") != -1,
	ie10: nut.indexOf("msie 10") != -1,
	ie11: nut.indexOf("trident") != -1,
	edge: nut.indexOf("edge") != -1,
	ff: nut.indexOf("firefox") != -1,
	webkit: nut.indexOf("webkit") != -1 && nut.indexOf("edge") == -1,
	safari: nut.indexOf("safari") != -1 && nut.indexOf("edge") == -1 && nut.indexOf("chrome") == -1,
	chrome: nut.indexOf("chrome") != -1 && nut.indexOf("edge") == -1,
	opera: nut.indexOf("opera") != -1,
	iphone: nut.indexOf("iphone") != -1,
	ipad: nut.indexOf("ipad") != -1,
	ipod: nut.indexOf("ipod") != -1,
	android: nut.indexOf("android") != -1,
	xp: nut.indexOf("nt 5.1") != -1,
	win: nut.indexOf("windows") != -1,
	win10: nut.indexOf("windows nt 10") != -1,
	mac: nut.indexOf("macintosh") != -1,
	ios: nut.indexOf("iphone") != -1 || nut.indexOf("ipad") != -1 || nut.indexOf("ipod") != -1,
	phone: nut.indexOf("iphone") != -1 || (nut.indexOf("android") != -1 && nut.indexOf("mobile") != -1),
	mobile: typeof window.orientation != "undefined",
	spWebkit: nut.indexOf("iphone") != -1 || nut.indexOf("ipad") != -1 || nut.indexOf("ipod") != -1 || (nut.indexOf("android") != -1 && nut.indexOf("mobile") != -1)
};

(function () {

	/*---------------------------------------------
		Default Settings
		---------------------------------------------*/

	$("html").addClass("js");
	if (_ua.mobile) $("html").addClass("sp");
	if (_ua.phone) $("html").addClass("phone");
	if (_ua.win10 && _ua.chrome) $("html").addClass("winChrome");
	if (_ua.spWebkit) $("html").addClass("spWebkit");

	if (_ua.opera || _ua.ff || _ua.safari) {
		window.onunload = function () { }
	}

	/*---------------------------------------------
		Text Overflow Ellipsis
		---------------------------------------------*/

	if (!_ua.webkit) {
		$(".main .txt-ellipsis[data-line]:not([data-line='1'])").textOverflowEllipsis({
			resize: _ua.ie ? false : true,
			numOfCharactersToReduce: 1,
			suffix: "…"
		});
	}

	/*---------------------------------------------
		Slider
		---------------------------------------------*/

	$(".main .slider").each(function () {
		var $this = $(this);
		var html = $(this).html();
		$this.html("<div class='slider-container'>" + html + "</div>");
	});

	$(".main .slider .col-set").each(function () {
		$this = $(this);

		// var slideNum = $this.find(".col1-2")[0] ? 2 : $this.find(".col1-3")[0] ? 3 : $this.find(".col1-4")[0] ? 4 : $this.find(".col1-5")[0] ? 5 : 6;
		var slideNum = $this.find(".col1-1")[0] ? 1 : $this.find(".col1-2")[0] ? 2 : $this.find(".col1-3")[0] ? 3 : $this.find(".col1-4")[0] ? 4 : $this.find(".col1-5")[0] ? 5 : 6;

		$this.slick({
			accessibility: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			cssEase: 'ease-in-out',
			swipe: false,
			arrows: true,
			centerMode: false,
			slidesToShow: slideNum,
			pauseOnHover: false,
			infinite: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						accessibility: true,
						autoplay: true,
						autoplaySpeed: 5000,
						speed: 500,
						cssEase: 'ease-in-out',
						swipe: true,
						arrows: false,
						dots: true,
						infinite: true,
						// centerMode: true,
						centerMode: false,
						centerPadding: '12%',
						slidesToShow: 1
					}
				}
			]
		});

	});

	/*---------------------------------------------
		Tab
		---------------------------------------------*/

	var animate = 0;

	$(".main .sp-accordion").each(function () {
		$spAccordion = $(this);
		var $tabContent = $spAccordion.find(".tab-content");
		$spAccordion.find(".tab-nav li").each(function (i) {
			var $li = $(this);
			var current = $li.hasClass("current") ? " current" : "";
			$li.find("a").append("<span></span>");
			$tabContent.find(".tab-element").eq(i).before("<p class='sp-tab-nav" + current + "'>" + $li.html() + "</p>");
		});
	});

	$(".main .tab-content").each(function () {
		var $this = $(this);
		var html = $(this).html();
		$this.html("<div class='row'><div class='tab-container'><div class='tab-slider'>" + html + "</div></div></div>");
	});

	$(".main .tab-nav li").on("click", function () {
		if (animate) return false;
		animate = 1;
		var $this = $(this);
		var $tabNav = $this.parent();
		var $prev = $tabNav.find(".current");
		var prevIndex = $tabNav.find("li").index($prev);
		$prev.removeClass("current");
		var $spTabNav = $tabNav.next().find(".sp-tab-nav");
		$spTabNav.removeClass("current");
		$this.addClass("current");
		var index = $tabNav.find("li").index($this);
		var $content = $tabNav.next();
		var $el = $content.find(".tab-element");
		var $slider = $content.find(".tab-slider");
		$spTabNav.eq(index).addClass("current");
		$content.height($content.outerHeight());
		$el.show();
		$content.animate({ height: $el.eq(index).outerHeight() }, 500, "easeInOutCubic");
		$slider.css({ left: (-prevIndex * 100) + "%" }).animate({ left: (-index * 100) + "%" }, 500, "easeInOutCubic", function () {
			$el.hide().eq(index).show();
			$content.removeAttr("style");
			$slider.removeAttr("style");
			animate = 0;
		});
		return false;
	});

	/*
$(".main .sp-tab-nav").on("click", function() {
	if(animate || $(this).hasClass("current")) return false;
	animate = 1;
	var $this = $(this);
	var $tabContent = $this.parent();
	var $current = $tabContent.find(".current");
	var index = $tabContent.find(".sp-tab-nav").index($this);
	$current.parent().parent().parent().parent(".sp-accordion").find(".tab-nav li").removeClass("current").eq(index).addClass("current");
	var offsetPrev = $current.offset().top;
	var offsetCurrent = $this.offset().top;
	var offset = (offsetPrev < offsetCurrent) ? offsetCurrent - $current.next().outerHeight() : offsetCurrent;
	$("body, html").stop().animate({scrollTop: offset}, 500, "easeInOutCubic");
	$current.removeClass("current").next().slideUp(500, "easeInOutCubic");
	$this.addClass("current").next().slideDown(500, "easeInOutCubic", function() {
		animate = 0;
	});
	return false;
});
*/

	$(".main .sp-tab-nav").on("click", function () {
		var $this = $(this);
		if ($(this).hasClass("current")) {
			animate = 1;
			$this.removeClass("current").next().slideUp(500, "easeInOutCubic", function () {
				animate = 0;
			});
		} else {
			if (animate || $(this).hasClass("current")) return false;
			animate = 1;
			var offset;
			var index;
			var offsetCurrent;
			var $tabContent = $this.parent();
			//if($tabContent)
			//var $find = $tabContent.find();
			var $current = $tabContent.find(".current");
			if ($current.hasClass("current")) {
				index = $tabContent.find(".sp-tab-nav").index($this);
				$current.parent().parent().parent().parent(".sp-accordion").find(".tab-nav li").removeClass("current").eq(index).addClass("current");
				var offsetPrev = $current.offset().top;
				offsetCurrent = $this.offset().top;
				offset = (offsetPrev < offsetCurrent) ? offsetCurrent - $current.next().outerHeight() : offsetCurrent;
				$("body, html").stop().animate({ scrollTop: offset }, 500, "easeInOutCubic");
				$current.removeClass("current").next().slideUp(500, "easeInOutCubic");
				$this.addClass("current").next().slideDown(500, "easeInOutCubic", function () {
					animate = 0;
				});
			} else {
				//index = $tabContent.find(".sp-tab-nav").index($this);
				$this.addClass("current");
				offsetCurrent = $this.offset().top;
				//var offset = (offsetPrev < offsetCurrent) ? offsetCurrent - $current.next().outerHeight() : offsetCurrent;
				offset = offsetCurrent;
				$("body, html").stop().animate({ scrollTop: offset }, 500, "easeInOutCubic");
				//$current.removeClass("current").next().slideUp(500, "easeInOutCubic");
				$this.addClass("current").next().slideDown(500, "easeInOutCubic", function () {
					animate = 0;
				});
			}
		}
		return false;
	});

	// brand logo tabs

	$(".tab-brand-logo .tab-brand-logo-name li:first-child").addClass("current-brand");
	$(".tab-brand-logo .tab-brand-logo-content").children("div:first-child").addClass("current-brand");


	$(".main .tab-brand-logo-name li").on("click", function () {
		var index = $(".tab-brand-logo-name-list").index(this);

		$(".main .tab-brand-logo-name li").removeClass("current-brand");
		$(this).addClass("current-brand");

		$(".main .tab-brand-logo-element").removeClass("current-brand");
		$(".main .tab-brand-logo-element").eq(index).addClass("current-brand");
		return false;
	});

	/*---------------------------------------------
		Modal
		---------------------------------------------*/

	var scrollbar = '<div id="outer" style="overflow-y:scroll;"><div id="inner"></div></div>';
	$("body").append(scrollbar);
	var scrollbarW = $("#outer").width() - $("#inner").width();
	$("#outer").remove();
	$("html").addClass("sb" + scrollbarW);

	$.extend(true, $.magnificPopup.defaults, {
		tClose: '閉じる',
		tLoading: 'ロード中...',
		gallery: {
			tPrev: '前へ (左矢印キー)',
			tNext: '次へ (右矢印キー)',
			tCounter: '%curr% / %total%'
		},
		image: {
			tError: '<a href="%url%">画像</a> を読み込めませんでした。'
		}
	});

	$('.main .modal-img').magnificPopup({
		type: 'image',
		removalDelay: 500,
		image: {
			titleSrc: function (item) {
				return item.el.attr('title') || item.el.find('img').attr('alt');
			}
		},
		callbacks: {
			open: function () {
				$(".mfp-container").addClass("row");
			}
		}
	});

	$('.main .modal-video').each(function () {
		var link = $(this).attr('href');
		$(this).magnificPopup({
			type: 'iframe',
			removalDelay: 600,
			iframe: {
				patterns: {
					youtube: {
						src: link
					}
				}
			},
			callbacks: {
				open: function () {
					$(".mfp-container").addClass("row");
				}
			}
		});
	});

	$('.main .modal-inline').magnificPopup({
		type: 'inline',
		removalDelay: 500,
		preloader: false,
		callbacks: {
			open: function () {
				$(".mfp-container").addClass("row");
				$(".mfp-content").addClass("main");
				$(".mfp-content > div").addClass("row");
			}
		}
	});

	$('.main .modal-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		removalDelay: 500,
		gallery: {
			enabled: true
		},
		image: {
			titleSrc: function (item) {
				return item.el.attr('title') || item.el.find('img').attr('alt');
			}
		},
		callbacks: {
			open: function () {
				$(".mfp-container").addClass("row");
			}
		}
	});

	/*---------------------------------------------
		Scroll Effect
		---------------------------------------------*/

	$(".main .slidein").before("<span class='slidein-bg'><span></span></span>");

	$(window).on("load scroll resize", function () {

		var scroll = $(window).scrollTop();
		var windowH = $(window).height();
		var fadePos = [];
		var slidePos = [];

		$(".main .fadein").each(function (i) {
			if (!$(this).hasClass("done")) {
				var $this = $(this);
				fadePos[i] = $this.offset().top;
				if (scroll > fadePos[i] - windowH + windowH / 5) {
					$this.addClass("done");
					switch (fadePos[i]) {
						case fadePos[i - 3]:
							var interval = 7;
							break;
						case fadePos[i - 2]:
							var interval = 5;
							break;
						case fadePos[i - 1]:
							var interval = 3;
							break;
						default:
							var interval = 1;
							break;
					}
					$this.css({
						opacity: 1,
						transform: "translate3d(0, 0, 0)",
						mozTransition: "opacity .5s linear ." + interval + "s, -moz-transform .5s ease-out ." + interval + "s",
						webkitTransition: "opacity .5s linear ." + interval + "s, -webkit-transform .5s ease-out ." + interval + "s",
						transition: "opacity .5s linear ." + interval + "s, transform .5s ease-out ." + interval + "s",
					});
				}
			}
		});

		$(".main .slidein").each(function (i) {
			if (!$(this).hasClass("done")) {
				var $this = $(this);
				slidePos[i] = $this.offset().top;
				if (scroll > slidePos[i] - windowH + windowH / 5) {
					$this.addClass("done");
					var $slideContainer = $this.prev();
					var $slide = $slideContainer.find("span");
					var w = $this.outerWidth();
					var h = $this.outerHeight();
					var t = $this.position().top;
					var l = $this.position().left;
					$slideContainer.width(w).height(h).css({ top: t, left: l });
					switch (slidePos[i]) {
						case slidePos[i - 3]:
							var interval = 7;
							break;
						case slidePos[i - 2]:
							var interval = 5;
							break;
						case slidePos[i - 1]:
							var interval = 3;
							break;
						default:
							var interval = 1;
							break;
					}
					$slide.css({
						transform: "translate3d(0, 0, 0)",
						mozTransition: "-moz-transform .35s ease-in ." + interval + "s",
						webkitTransition: "-webkit-transform .35s ease-in ." + interval + "s",
						transition: "transform .35s ease-in ." + interval + "s",
					}).on("mozTransitionEnd webkitTransitionEnd transitionend", function () {
						$this.css({ visibility: "visible" });
						$slide.css({
							transform: "translate3d(100%, 0, 0)",
							mozTransition: "-moz-transform .3s ease-out",
							webkitTransition: "-webkit-transform .3s ease-out",
							transition: "transform .3s ease-out"
						}).on("mozTransitionEnd webkitTransitionEnd transitionend", function () {
							$slideContainer.remove();
						});
					});
				}
			}
		});

	});

	/*---------------------------------------------
		load Effect
		---------------------------------------------*/

	$(".loadslidein").before("<span class='slidein-bg'><span></span></span>");

	$(window).on("load scroll resize", function () {

		var scroll = $(window).scrollTop();
		var windowH = $(window).height();
		var fadePos = [];
		var slidePos = [];

		$(".main .loadfadein").each(function (i) {
			if (!$(this).hasClass("done")) {
				var $this = $(this);
				interval = i * 1
				$this.css({
					opacity: 1,
					transform: "translate3d(0, 0, 0)",
					mozTransition: "opacity .5s linear ." + interval + "s, -moz-transform .5s ease-out ." + interval + "s",
					webkitTransition: "opacity .5s linear ." + interval + "s, -webkit-transform .5s ease-out ." + interval + "s",
					transition: "opacity .5s linear ." + interval + "s, transform .5s ease-out ." + interval + "s",
				});
			}
		});

		$(".loadslidein").each(function (i) {
			if (!$(this).hasClass("done")) {
				var $this = $(this);
				//slidePos[i] = $this.offset().top;
				$this.addClass("done");
				var $slideContainer = $this.prev();
				var $slide = $slideContainer.find("span");
				var w = $this.outerWidth();
				var h = $this.outerHeight();
				var t = $this.position().top;
				var l = $this.position().left;
				$slideContainer.width(w).height(h).css({ top: t, left: l });
				var interval = i * 1;
				$slide.css({
					transform: "translate3d(0, 0, 0)",
					mozTransition: "-moz-transform .35s ease-in ." + interval + "s",
					webkitTransition: "-webkit-transform .35s ease-in ." + interval + "s",
					transition: "transform .35s ease-in ." + interval + "s",
				}).on("mozTransitionEnd webkitTransitionEnd transitionend", function () {
					$this.css({ visibility: "visible" });
					$slide.css({
						transform: "translate3d(100%, 0, 0)",
						mozTransition: "-moz-transform .3s ease-out",
						webkitTransition: "-webkit-transform .3s ease-out",
						transition: "transform .3s ease-out"
					}).on("mozTransitionEnd webkitTransitionEnd transitionend", function () {
						$slideContainer.remove();
					});
				});
			}
		});
	});

	/*---------------------------------------------
		Laze Load
		---------------------------------------------*/
	$(".lazy").lazyload();

	/*---------------------------------------------
		Smooth Scroll
		---------------------------------------------*/
	$("body").on("click", "a", function () {
		var windowWidth = $(window).width();
		var windowSp = 767;
		if (windowWidth <= windowSp) {
			var headerHeight = 70;
		} else {
			var headerHeight = 120;
		}

		if ($(this).hasClass("modal-inline") || $(this).hasClass("sp-sidemenu-btn")) return false;

		var link = $(this).attr("href");
		if (link.charAt(0) == "#" && link.length > 1) {

			var offset = $(link).offset().top - headerHeight;
			$("body, html").stop().animate({ scrollTop: offset }, 800, "easeInOutCubic");
			return false;
		}
	});

	// $("body").on("click", "a", function(){
	// 	if($(this).hasClass("modal-inline")) return false;
	// 	var link = $(this).attr("href");
	// 	if(link.charAt(0) == "#" && link.length > 1) {
	// 		var offset = $(link).offset();
	// 		$("body, html").stop().animate({scrollTop: offset.top}, 800, "easeInOutCubic", function() {
	// 			location.href = link;
	// 		});
	// 		return false;
	// 	}
	// });

	/*---------------------------------------------
		Share Button
		---------------------------------------------*/

	if ($(".main .btn-share")[0]) {

		var url = location.href;
		var hatenaUrl = url.slice(-1) == "/" ? url.slice(0, -1).replace("http://", "") : url.replace("http://", "");
		var fbAppId = "";

		// ----- Facebook -----

		var html = '<div class="share-facebook"><div id="fb-root"></div><div class="fb-like" data-href="' + encodeURIComponent(url) + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div></div>';

		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.10" + (fbAppId == "" ? "" : "&appId=" + fbAppId);
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		// ----- Twitter -----

		html += '<div class="share-twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' + url + '" data-lang="ja">ツイート</a></div>';

		!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + '://platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs); } }(document, 'script', 'twitter-wjs');

		// ----- Google+ -----

		html += '<div class="share-google"><div class="g-plusone" data-size="medium" data-href="' + url + '"></div></div>';

		window.___gcfg = { lang: 'ja' };
		(function () {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/platform.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		})();

		// ----- Hatena -----

		html += '<div class="share-hatena"><a href="http://b.hatena.ne.jp/entry/' + hatenaUrl + '" class="hatena-bookmark-button" data-hatena-bookmark-layout="simple-balloon" title="このエントリーをはてなブックマークに追加"><img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script></div>';

		$(".main .btn-share").each(function () { $(this).append(html) });

	}

	/*---------------------------------------------
		Button
		---------------------------------------------*/

	// ----- Page Top Button -----

	$(window).on("load scroll resize", function () {
		if ($(window).scrollTop() > 500) {
			$("#btn-pagetop").addClass("show");
		} else {
			$("#btn-pagetop").removeClass("show");
		}
	});

	// ----- Menu Button -----

	$("#btn-menu").on("click", function () {
		$(this).toggleClass("on");
	});

	// ------- Map Button -------
	$(".map-dl .btn-map").on("click", function () {
		$(this).children("span").toggleClass("active");
		$(this).next(".map-content").slideToggle();
	})

	// ------- Accordion Button -------
	$(".accordion-btn").on("click", function () {
		$(this).children("span").toggleClass("active");
		$(this).next(".accordion-content").slideToggle();
		console.log("done");
	})

	/*---------------------------------------------
		SPmenu
		---------------------------------------------*/

	/*
	$(".sp-menu-btn").on("click", function() {
		$(".header-navs").stop().fadeToggle(3000,function(){
			$(this).toggleClass("open");
		})
		return false;
	});
	*/
	var returnPos;
	$(".sp-menu-btn").on("click", function () {
		console.log(".sp-menu-btn");
		if ($(".header-navs").hasClass("open")) {

			$.when(
				$(".header-navs").addClass("close")
			).done(function () {
				$(".header-navs").delay(300).queue(function (next) {
					$(this).removeClass("close").dequeue();
				});
			});

		} else {
			if (!$(".sp-header-search").hasClass("search-open")) {
				returnPos = $(window).scrollTop();
			}
		}
		$(".header-navs").toggleClass("open");
		$("#header").toggleClass("open");
		$("html").toggleClass("open");
		$("body").toggleClass("open");
		$(".sp-header-search").removeClass("search-open");
		$("#header").removeClass("search-open");
		$("html").removeClass("search-open");
		$("body").removeClass("search-open");
		$(window).scrollTop(returnPos);
		return false;
	});

	// $(".sp-search-btn").on("click", function () {
	// 	console.log(".sp-menu-search");
	// 	if ($(".sp-header-search").hasClass("search-open")) {

	// 		$.when(
	// 			$(".sp-header-search").addClass("search-close")
	// 		).done(function () {
	// 			$(".sp-header-search").delay(300).queue(function (next) {
	// 				$(this).removeClass("search-close").dequeue();
	// 			});
	// 		});

	// 	} else {
	// 		if (!$(".header-navs").hasClass("open")) {
	// 			returnPos = $(window).scrollTop();
	// 		}
	// 	}
	// 	$(".sp-header-search").toggleClass("search-open");
	// 	$("#header").toggleClass("search-open");
	// 	$("html").toggleClass("search-open");
	// 	$("body").toggleClass("search-open");
	// 	$(".header-navs").removeClass("open");
	// 	$("#header").removeClass("open");
	// 	$("html").removeClass("open");
	// 	$("body").removeClass("open");
	// 	$(window).scrollTop(returnPos);
	// 	return false;
	// });

	/*---------------------------------------------
		Product Brand tab SP scroll
		---------------------------------------------*/

	$('.tab-brand-logo-name-list').on('click', function () {
		var windowWidth = $(window).width();
		if (windowWidth < 768) {
			var speed = 500;
			var target = $('.tab-brand-logo-content');
			var position = target.offset().top;
			$('html, body').animate({ scrollTop: position }, speed, 'swing');
		}
	});

	/*---------------------------------------------
		sidebar SP
		---------------------------------------------*/
	$('.sp-sidemenu-btn').on('click', function () {
		$('#sidebar').find('.sidemenu-wrapper').slideToggle();
		$('#sidebar').toggleClass("sidebar-open");
		$('body').toggleClass("sidebar-open");
		$('html').toggleClass("sidebar-open");
		$(this).toggleClass("sidebar-open");
	});

	var currentWindowWidth = $(window).width();
	var resizeTimer = false;
	$(window).on("orientationchange resize", function () {
		var windowWidth = $(window).width();
		if (currentWindowWidth == windowWidth) {
			return;
		} else {
			$('#sidebar').removeClass("sidebar-open");
			$('body').removeClass("sidebar-open");
			$('html').removeClass("sidebar-open");
			if (windowWidth > 767) {
				$('#sidebar').find('.sidemenu-wrapper').css("display", "flex");
				$('.sp-sidemenu-btn').removeClass("sidebar-open");
			} else {
				$('#sidebar').find('.sidemenu-wrapper').css("display", "none");
				$('.sp-sidemenu-btn').removeClass("sidebar-open");
			}
		}

	});

	/*---------------------------------------------
		header sticky
		---------------------------------------------*/

	$(window).on("scroll resize", function () {
		if ($(this).scrollTop() > 50) {
			$("#header").addClass("sticky");
			$(".header-logo").removeClass("top");
		}
		else {
			$("#header").removeClass("sticky");
			$(".header-logo").addClass("top");
		}
	});

	/* IE */

	if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edg/)) {
		var modalflag = 0;
		//animatedModals変数がある場合のみ、モーダルの展開を検知
		if ("animatedModals" in window) {
			if (Array.isArray(animatedModals)) {
				$.each(animatedModals, function (index, value) {
					$(value).on("click", function () {
						modalflag = 1;
					});
				});
			}
		}
		// 關閉通知
		$(".close-modal").on("click", function () {
			modalflag = 0;
		});
		// 關閉通知無效化
		$('body').on("mousewheel", function () {
			if (modalflag == 0) {
				event.preventDefault();
				var wd = event.wheelDelta;
				var csp = window.pageYOffset;
				window.scrollTo(0, csp - wd);
			}
		});
	}

}());
