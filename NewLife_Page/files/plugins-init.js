
$(document).ready(function(){
    if ($.isFunction($.fn.magnificPopup)) {
        $(function() {
            $('.equipPop.video').each(function(){
                $(this).magnificPopup({
                    type:'iframe',
                    iframe: {
                      markup: '<div class="mfp-iframe-scaler">'+
                                '<div class="mfp-close"></div>'+
                                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                              '</div>', 
                      patterns: {
                        youtube: {
                          index: 'youtube.com/', 
                          id: 'v=',
                          src: '//www.youtube.com/embed/%id%?autoplay=1' 
                        }
                      },
                      srcAction: 'iframe_src', 
                    }
                });
            });
            $('.equipPop.image').each(function(){
                $(this).magnificPopup({
                    type:'image'
                });
            });

            $('.cPops').each(function(){
                $(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery:{enabled:true},
                    callbacks:{
                        elementParse:function(item) {
                            if(item.el.parent().hasClass('vid')){
                                item.type="iframe"
                            }
                        }
                    }
                })
            });

            //$( '#addPrayer').each(function() {
            //    var $this = $(this),
            //        opts;
            //
            //    var pluginOptions = $this.data('plugin-options');
            //    if (pluginOptions)
            //        opts = pluginOptions;
            //
            //    $this.basePluginMagnific({
            //        items:{
            //            src:'#prayerForm',
            //            type:'inline',
            //            modal:false
            //        }
            //    });
            //});

            //
            //$( '.prayFor').each(function() {
            //    var $this = $(this),
            //        opts;
            //
            //    var pluginOptions = $this.data('plugin-options');
            //    if (pluginOptions)
            //        opts = pluginOptions;
            //
            //    $this.basePluginMagnific({
            //        items:{
            //            src:'#cross',
            //            type:'inline',
            //            modal:false
            //        }
            //    });
            //});

            //$( '#prayerConfirmBtn').each(function() {
            //    var $this = $(this),
            //        opts;
            //
            //    var pluginOptions = $this.data('plugin-options');
            //    if (pluginOptions)
            //        opts = pluginOptions;
            //
            //    $this.basePluginMagnific({
            //        items:{
            //            src:'#prayerConfirm',
            //            type:'inline',
            //            modal:false
            //        }
            //    });
            //});

        });
    }
    $(window).scroll(function() {
        if ($(window).eq(0).scrollTop()>500) {
            $('#back2top').stop(true, true).fadeIn();
        } else {
            $('#back2top').stop(true, true).fadeOut();
        }
    });

    $('#back2top').on('click', function(){
        $("html, body").animate({'scrollTop': 0}, 300);
    });

    /***** INSTAGRAM ******/
    //var instaAccessToken = '40376848.21f75dc.ec21da812f83410182bb8466a475a337', instaUserId = '40376848';
    var instaAccessToken = '2046563756.1bb1249.7329c15493e84062904287d98d2a9b93', instaUserId = '444003452';
    var ajaxUrl = 'https://api.instagram.com/v1/users/' + instaUserId + '/media/recent/?access_token=' + instaAccessToken;
    $.ajax({
        url: ajaxUrl,
        dataType: 'jsonp'
    }).done(function(data){
        var instagramHTML = '';
        $.each(data.data, function(idx, val){
            if (idx < 12) {
                var thisImgHtml = '<a href="' + val.link + '" target="blank"><img src="' + val.images.standard_resolution.url + '" alt=""><div class="likeWrap"><i style="color:#E72476" class="fa fa-heart"></i> '+val.likes.count+'</div></a>';
                instagramHTML = instagramHTML + thisImgHtml;    
            }
        });
        // console.log('final: ' + instagramHTML);
        $('#instagram').append(instagramHTML);
    }).fail(function(){
        console.log('ajax fail');
    });
});


// screensize handler
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseGetScreenSize)) {
        $(function() {

            $(window).baseGetScreenSize();

        });
    }

}).apply(this, [jQuery]);

// menuInteraction

(function($) {
    'use strict';

    if ($.isFunction($.fn.baseMenuInteraction)) {
        $(function() {

            $('.ddmenu').each(function() {
                var $this = $(this);

                $this.baseMenuInteraction();
            });
        });
    }

}).apply(this, [jQuery]);

// clean Menu
(function($) {
    'use strict';

    $('.menuToggle button').on('click', function() {
        var closeArr = [
            '#searchBox',
            '#friendlyLinks'
        ];

        for (var i = 0; i < closeArr.length; i++) { 
            $(closeArr[i]).removeClass('active');
        }
    });

}).apply(this, [jQuery]);

// video grid handler
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseVideoGridHandler)) {
        $(function() {

            $('#videoGrid').baseVideoGridHandler();

        });
    }

}).apply(this, [jQuery]);

// video stretch
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseVideoStretch)) {
        $(function() {

            $('.videobox').each(function() {
                var $this = $(this);

                $this.baseVideoStretch();
            });
        });
    }
}).apply(this, [jQuery]);


// Toggle-click
(function($) {

    'use strict';

    if ($.isFunction($.fn.baseToggleClick)) {

        $(function() {
            $('[data-toggle="click"]').each(function() {
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions) {
                    opts = pluginOptions;
                }

                $this.baseToggleClick(opts);
            });
        });

    }

}).apply(this, [jQuery]);

// event list
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseEventsList)) {
        $(function() {

            $('.cube-list').each(function() {
                var $this = $(this);

                $this.baseEventsList();
            });
        });
    }
}).apply(this, [jQuery]);

// flipster

(function($) {
    'use strict';

    if ($.isFunction($.fn.baseFlipster)) {
        //$(function() {

            $('#nl-coverflow').css("opacity", 1).baseFlipster({ style: 'carousel', start: 0 });
            // $("#nl-coverflow").css("opacity", 1);

        //});
    }
}).apply(this, [jQuery]);


// event list
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseJqReflect)) {
        $(function() {

            $('.coverCard img').each(function() {
                var $this = $(this);

                $this.baseJqReflect();
            });
        });
    }
}).apply(this, [jQuery]);

$(function(){

    $('#countDown').countdown('2015/5/7',function(e){
        var $this = $(this);
        $this.find('.day').text(e.strftime('%-D'));
        $this.find('.hour').text(e.strftime('%-H'));
        $this.find('.min').text(e.strftime('%-M'));
        $this.find('.sec').text(e.strftime('%-S'));
    });

});

// career list
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseCareerList)) {
        $(function() {

            $('.careerUl').baseCareerList();

        });
    }
}).apply(this, [jQuery]);

// custom scroll
(function($) {
    'use strict';

    if ($.isFunction($.fn.baseCustomScroll)) {
        $(function() {

            $('.cContent').each(function(){
                // $(this).baseCustomScroll();
                $(this).baseCustomScroll({mouseWheel:{ scrollAmount: 200 }});
            });

        });
    }
}).apply(this, [jQuery]);

// church item

(function($) {
    'use strict';

    if ($.isFunction($.fn.baseChurchItem)) {
        $(function() {

            $('.churchItem').baseChurchItem();

        });
    }

}).apply(this, [jQuery]);

//Crazyslider
(function($) {

	'use strict';

	if ($.isFunction($.fn['baseCrazyslider'])) {
		$(function() {
			$( '#crazySlider').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = $this.data('plugin-options');
				if (pluginOptions)
					opts = pluginOptions;

                
                $('#news #issuesWrap').css('cssText', 'background: url("../img/loader.gif") no-repeat center center;min-height:700px;');

				// $this.baseCrazyslider(opts).promise().done(function(){
                    
                    var root = $('#crazySlider'),
                    images = root.find('img').css({
                        "visibility" : "hidden"
                    }),
                    timer, checkFlag = [], counter = 0;

                    images.each(function(index, value){
                        $(this).addClass('preloader');
                        checkFlag[index] = false;
                    });

                    images = $.makeArray(images);

                    timer = window.setInterval(function(){

                        if (counter >= checkFlag.length) {
                            $('#crazySlider').fadeIn(600);
                            $('#news .arr').fadeIn(600);
                            $('#crazySlider').baseCrazyslider(opts);
                            $('#news #issuesWrap').css('cssText', '') 
                            clearInterval(timer);

                            if (typeof callback !== "undefined") {
                                callback();
                            }

                            return;
                        }

                        for (var i = 0; i < images.length; i++) {
                            if (images[i].complete == true) {
                                if (checkFlag[i] == false) {
                                    checkFlag[i] = true;
                                    counter++;
                                }
                                $(images[i]).css({
                                    "visibility" : ""
                                }).show().removeClass('preloader');
                            }
                        }

                    }, 1);


                // });
			});
		});
	}

}).apply(this, [jQuery]);

/// Commom Plugins
(function($) {

    'use strict';

    // backstretch
    if ($.isFunction(base.PluginBackstretch.initialize) && $.backstretch) {

        $('#index .contentBody').backstretch("../img/base/home_bg.jpg");

        $('#list .pageHead').backstretch('../img/base/category/pagehead.jpg');

        $('#knowreligion .pageHead').backstretch('../img/base/forms/knowreligionHeader.jpg');

    }

}).apply(this, [jQuery]);

/// Accordion

(function($){
    'use strict';

    if($.isFunction($.fn['baseAccordionToggle'])){
        $(function(){
            $('.accordion').each(function(){
                var $this = $(this),opts;

                $this.baseAccordionToggle(opts);
            });
        });
    }

}).apply(this, [jQuery]);

////Royalslider
(function($) {

    'use strict';

    if ($.isFunction($.fn['basePluginRoyalSlider'])) {
        $(function() {
            $( '#kvWrap .royalSlider').each(function() {
                var $this = $(this),
                    opts,
                    autoplayOpts = {
                        // autoplay options go gere
                        enabled: true,
                        pauseOnHover: true,
                        delay : 1000
                    }

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;
                opts['autoPlay'] = autoplayOpts;
                // console.log('test: ' + opts);
                $this.basePluginRoyalSlider(opts);
            });
        });
    }

}).apply(this, [jQuery]);

////Slick
(function($) {

    'use strict';

    if ($.isFunction($.fn['basePluginSlick'])) {
        $(function() {
            $( '.slickCarousel').each(function() { 
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;

                $this.basePluginSlick({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay:false,
                    infinite: true,
                    // variableWidth:true,
                    appendArrows:'#carouselNav',
                    prevArrow:'<div class="prev"></div>',
                    nextArrow:'<div class="next"></div>',
                    responsive: [
                        {
                          breakpoint: 800,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                    ]
                });
            });
            $( '.slickCarousel-head').each(function() { 
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;

                $this.basePluginSlick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay:false,
                    infinite: true,
                    // variableWidth:true,
                    appendArrows:'#carouselNav',
                    prevArrow:'<div class="prev"></div>',
                    nextArrow:'<div class="next"></div>'
                });
            });

            $('.equipSlick').each(function(){
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;

                $this.basePluginSlick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay:false,
                    infinite: true,
                    // variableWidth:true,
                    // appendArrows:'.carouselNav',
                    prevArrow:'<div class="prev"></div>',
                    nextArrow:'<div class="next"></div>'
                });
            });
        });
    }

}).apply(this, [jQuery]);

/// slide toggler

(function($){
    'use strict';

    if($.isFunction($.fn['baseSlideToggler'])){
        $(function(){
            $('.slideToggle').each(function(){
                var $this = $(this),opts;

                $this.baseSlideToggler(opts);
            });
        });
    }

}).apply(this, [jQuery]);

/// winner grid

(function($){
    'use strict';

    if($.isFunction($.fn['baseWinnerGrid'])){
        $(function(){
            $('#winnerGrid').each(function(){
                var $this = $(this),opts;

                $this.baseWinnerGrid(opts);
            });
        });
    }

}).apply(this, [jQuery]);


//History Caption
(function($) {

    'use strict';

    if ($.isFunction($.fn['baseHistoryCaption'])) {
        $(function() {
            $( '.timelineItem').each(function() {
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;

                $this.baseHistoryCaption(opts);
            });
        });
    }

}).apply(this, [jQuery]);

/// isotope

(function($){
    'use strict';

    if($.isFunction($.fn['basePluginIsotope'])){
        $(function(){
            $('.topeWrapper').each(function(){
                var $this = $(this),opts;

                $this.basePluginIsotope({
                    itemSelector:'.careerItem',
                    layoutMode:'masonry',
                });
            });
        });
    }

}).apply(this, [jQuery]);

// History Animate
(function($) {

    'use strict';

    if ($.isFunction($.fn['PluginAnimate'])) {

        $(function() {
            // $('[data-plugin-animate], [data-appear-animation]').each(function() {
            $('.timelineItem').each(function() { 
                var $this = $(this),
                    opts;

                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;

                $this.PluginAnimate(opts);
            });
        });

    }

}).apply(this, [jQuery]);

