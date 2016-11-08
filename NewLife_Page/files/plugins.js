// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// preloader

(function() {

}());

// base
window.base = {};
var base;

// default isSmallScreen
base.screenX = 0;
base.screenY = 0;
base.isSmallScreen = false;

// detect screensize
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__getscreensize';

    // re turn prototype initial funciton
    var GetScreenSize = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    GetScreenSize.defaults = {
        smallScreenWidth : 768,
        resizeEndWait : 200,
        afterResize:function() {
            // todo not in small screen
            $('#videoGrid').css(
                    { 'width':base.screenX, 'height':base.screenY }
                );

            $('.videobox').each(function() {
                var $this = $(this);
                $this.data('__videoStretch').stretchVids();
            });

            $('#logoWrap').css({
                'top' : (base.screenY / 2) - 105 + 'px',
                'right' : (base.screenX / 3) - 105 + 'px'
            });

            $('.cube-list').each(function() {
                $(this).data('__eventslist').setWidthHeight();
            });

            if($('body').is('#careerList')){
                $('.careerUl').data('__careerlist').build();
            }
        }
    };

    // build prototype
    GetScreenSize.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build()
                .events();

            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, GetScreenSize.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper;

            base.screenX = $('body').innerWidth();
            base.screenY = $el.height();

            if (base.screenX < self.options.smallScreenWidth) {
                base.isSmallScreen = true;
            }else {
                base.isSmallScreen = false;
            }

            return this;
        },

        events:function() {
            var self = this,
            $el = this.options.wrapper;

            $el.bind('resize', function() {
                // $el.resizeEvt;
                $el.resize(function() {
                    clearTimeout($el.resizeEvt);
                    $el.resizeEvt = setTimeout(function() {
                        base.screenX = $('body').innerWidth();
                        base.screenY = $el.height();
                        // functions runs after resize done
                        self.onAfterResize();
                    }, self.options.resizeEndWait);
                });
            });
        },

        onAfterResize:function() {
            var self = this;
            // $el = this.options.wrapper;
            if (base.screenX < self.options.smallScreenWidth) {
                base.isSmallScreen = true;
            }else {
                base.isSmallScreen = false;
            }
            self.options.afterResize();
        }
    };

    // expose to top level scope
    $.extend(base, {
        GetScreenSize : GetScreenSize
    });

    // trun to jQuery
    $.fn.baseGetScreenSize = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new GetScreenSize($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);

// handle videoGrid
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__handlevideogrid';

    // re turn prototype initial funciton
    var VideoGridHandler = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    VideoGridHandler.defaults = {
        easing : 'easeOutQuint'
    };

    // build prototype
    VideoGridHandler.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, VideoGridHandler.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper;
            $el.css({
                'width':base.screenX,
                'height':base.screenY
            });
            var videoArr = $el.find('.videobox');


            self.vid1 = $(videoArr[0]);
            self.vid2 = $(videoArr[1]);
            self.vid3 = $(videoArr[2]);
            self.vid4 = $(videoArr[3]);
            self.vid5 = $(videoArr[4]);

            // set initial width height

            self.vid4.css({
                'width':'100%',
                'height':'100%'
            });
            self.vid1.css({
                'width':'100%',
                'height':'0'
            });
            self.vid3.css({
                'width':'0',
                'height':'50%'
            });
            self.vid5.css({
                'width':'0',
                'height':'50%'
            });
            self.vid2.css({
                'width' : '0',
                'height' : '50%',
                'left' : ($(window).width() * 0.3333) + 'px'
            });
            $('#logoWrap').css({
                'top' : (base.screenY / 2) - 105 + 'px',
                'right' : (base.screenX / 3) - 105 + 'px'
            });
            self.stageInit();
            return this;
        },
        stageInit:function() {
            var self = this,
            $el = this.options.wrapper;

            $('#skipBtn').on('click', function(e) {
                e.preventDefault();
                setTimeout(function() {
                    if (!$el.hasClass('isAnimating') && !$el.hasClass('complete')) {
                        $('.intorTitleWrap').remove();
                        self.stage1();
                    }else {
                        return false;
                    }
                }, 200);
            });

        },
        stage1:function() {
            var self = this;

            $('.intorTitleWrap').fadeOut(800);
            $('#skipBtn').fadeOut(800);

            $('#logoWrap .top').animate({
                'width':'100%'
            }, 300, function() {
                $('#logoWrap .right').animate({
                    'height':'100%'
                }, 300, function() {
                    $('#logoWrap .bottom').animate({
                        'width':'100%'
                    }, 300, function() {
                        $('#logoWrap .left').animate({
                            'height':'100%'
                        }, 300, function() {
                            $('#logoWrap .logoInner').fadeIn(1000);
                            $('.videobox .tile .caption').fadeIn(800);
                            self.stage2();
                        });
                    });
                });
            });
        },
        stage2:function() {
            var self = this,
            $el = this.options.wrapper;

            $el.addClass('isAnimating');

            $('#maskTop').animate({
                'top' : '-90px'
            }, 300, self.options.easing);

            $('#maskBottom').animate({
                'bottom' : '-90px'
            }, 300, self.options.easing);

            $(self.vid1).data('__videoStretch').stretchVids(1, 0.5);
            $(self.vid4).data('__videoStretch').stretchVids(1, 0.5);

            $(self.vid1).animate({
                'height':'50%'
            }, 800, self.options.easing);
            $(self.vid4).animate({
                'height':'50%'
            }, 800, self.options.easing, function() {

                setTimeout(function() {
                    self.stage3();
                }, 200);
            });
        },
        stage3 : function() {
            var self = this;
            $(self.vid1).data('__videoStretch').stretchVids(0.5, 0.5);
            $(self.vid4).data('__videoStretch').stretchVids(0.6666, 0.5);
            $(self.vid3).data('__videoStretch').stretchVids(0.5, 0.5);
            $(self.vid5).data('__videoStretch').stretchVids(0.3333, 0.5);


            $(self.vid1).animate({
                'width':'50%'
            }, 800, self.options.easing);
            $(self.vid3).animate({
                'width':'50%'
            }, 800, self.options.easing);

            $(self.vid5).animate({
                'width':'33.33%'
            }, 500, self.options.easing);

            $(self.vid4).animate({
                'width':'66.66%'
            }, 800, self.options.easing, function() {
                setTimeout(function() {
                    self.stage4();
                },  200);
            });
        },
        stage4 : function() {
            var self = this;
            $(self.vid1).data('__videoStretch').stretchVids(0.3333, 0.5);
            $(self.vid3).data('__videoStretch').stretchVids(0.3333, 0.5);
            $(self.vid2).data('__videoStretch').stretchVids(0.33, 0.5);


            $(self.vid1).animate({
                'width':'33.33%'
            }, 800, self.options.easing);
            $(self.vid3).animate({
                'width':'33.33%'
            }, 800, self.options.easing);

            $(self.vid2).animate({
                'width':'33.33%'
            }, 500, self.options.easing, function() {
                setTimeout(function() {
                    self.stageEnd();
                }, 200);
            });
        },
        stageEnd:function() {
            var $el = this.options.wrapper;
            $el.addClass('complete');
            $el.removeClass('isAnimating');
        }
    };

    // expose to top level scope
    $.extend(base, {
        VideoGridHandler : VideoGridHandler
    });

    // trun to jQuery
    $.fn.baseVideoGridHandler = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new VideoGridHandler($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);


// video stretcher
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__videoStretch';

    // re turn prototype initial funciton
    var VideoStretch = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    VideoStretch.defaults = {
    };

    // build prototype
    VideoStretch.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, VideoStretch.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this;
            // $el = this.options.wrapper;

            self.stretchVids();
            return this;
        },

        stretchVids : function(w, h) {
            // var self = this,
            var $window = $(window),
            $el = this.options.wrapper,
            $inner = $el.find('.videocontainer'),
            $vid = $inner.find('video'),
            vidRatio,
            wrapperRatio,
            wrapperW,
            wrapperH,
            vidNewHeight,
            vidNewWidth;

            if (typeof w !== 'undefined') {
                wrapperW = $window.width() * w;
                wrapperH = $window.height() * h;
            }else {
                wrapperW = $el.width();
                wrapperH = $el.height();
            }

            vidRatio = $vid.width() / $vid.height();
            wrapperRatio = wrapperW / wrapperH;

            if (vidRatio > wrapperRatio) {
                vidNewWidth = (wrapperH * $vid.width()) / $vid.height();
                $vid.animate({
                    'width': vidNewWidth,
                    'height' : wrapperH,
                    'top' : '0px',
                    'left' : -(vidNewWidth - wrapperW) / 2
                });
            }else {
                vidNewHeight = ($vid.height() * wrapperW) / $vid.width();
                $vid.animate({
                    'width' : wrapperW,
                    'height' : vidNewHeight,
                    'left' : '0px',
                    'top' : -(vidNewHeight - wrapperH) / 2
                });
            }
        }

    };

    // expose to top level scope
    $.extend(base, {
        VideoStretch : VideoStretch
    });

    // trun to jQuery
    $.fn.baseVideoStretch = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new VideoStretch($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);


// main menu interaction
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__menuinteraction';

    // re turn prototype initial funciton
    var MenuInteraction = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    MenuInteraction.defaults = {
    };

    // build prototype
    MenuInteraction.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build()
                .events();

            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, MenuInteraction.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            // var self = this,
            var $el = this.options.wrapper;
            $el.find('ul').hide();
            $('.menuToggle').show();
            $('#mainHeader').show();

            return this;
        },

        events:function() {
            var self = this,
            $el = this.options.wrapper;
            if (base.isSmallScreen !== true) {
                $el.hover(
                    function() {self.itemsShow(this);},
                    function() {self.itemsHide(this);}
                );
            }else {
                $el.on('click', function() {
                    var $this = $(this);
                    if (!$this.hasClass('active')) {
                        $this.parent('ul').find('li').removeClass('active');
                        $this.addClass('active');
                        $this.parent('ul').find('li').find('ul').hide();
                        self.itemsShow(this);
                    }else {
                        $this.removeClass('active');
                        $this.find('ul').hide();
                    }

                });
            }

        },

        itemsShow:function(el) {
            $('ul', el).stop(true, true).show();
            $('ul', el).find('.navItem').css({
                opacity: 0
            }).each(function(i) {
                $(this).css({
                    y: '-40px',
                    rotateX: '90deg',
                    transformOrigin: 'center top'
                }).transition({
                    perspective: '400px',
                    y: '0',
                    rotateX: '0deg',
                    opacity: 1,
                    delay: 70 * i
                }, 200, 'ease');
            });
        },

        itemsHide:function(el) {
            $('ul', el).stop(true, true).fadeOut(400);
        }

    };

    // expose to top level scope
    $.extend(base, {
        MenuInteraction : MenuInteraction
    });

    // trun to jQuery
    $.fn.baseMenuInteraction = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new MenuInteraction($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);

// toggle-- click
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__toggleclick';

    // re turn prototype initial funciton
    var ToggleClick = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    ToggleClick.defaults = {
    };

    // build prototype
    ToggleClick.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build()
                .events();

            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, ToggleClick.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper;
            self.targetArr = $el.attr('data-target').replace(/\s+/g, '').split(',');

            return this;
        },
        events:function() {
            var self = this,
            $el = this.options.wrapper;

            // $el.parent('.menuToggle').on('hover', function(e) {

            $el.on('click', function(e) {
                
                e.preventDefault();

                $el.toggleClass('active');

                if (self.targetArr.length !== -1) {
                    for (var i = 0; i < self.targetArr.length; i++) {
                        $(self.targetArr[i]).toggleClass('active');
                    }
                }
            });
        }

    };

    // expose to top level scope
    $.extend(base, {
        ToggleClick : ToggleClick
    });

    // trun to jQuery
    $.fn.baseToggleClick = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new ToggleClick($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);

// Events List
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__eventslist';

    // re turn prototype initial funciton
    var EventsList = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    EventsList.defaults = {
    };

    // build prototype
    EventsList.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build()
                .events();
            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, EventsList.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this;
            // $el = this.options.wrapper;

            self.setWidthHeight();

            return this;
        },

        events:function() {
            var self = this,
            $el = this.options.wrapper,
            $cubeContainer = $el.find('.cube-container'),
            $faceFront = $el.find('.face-front'),
            inTranslate = 'translateZ(-' + self.newWdith / 2 + 'px) rotateX(90deg)',
            outTranslate = 'translateZ(-' + self.newWdith / 2 + 'px)';

            $el.hover(function() {
                $cubeContainer.css({
                    '-o-transform' : inTranslate,
                    '-ms-transform' : inTranslate,
                    '-moz-transform' : inTranslate,
                    '-webkit-transform' : inTranslate,
                    'transform' : inTranslate
                });
                $faceFront.css({
                    'z-index':'991'
                });
            }, function() {
                $cubeContainer.css({
                    '-o-transform' : outTranslate,
                    '-ms-transform' : outTranslate,
                    '-moz-transform' : outTranslate,
                    '-webkit-transform' : outTranslate,
                    'transform' : outTranslate
                });
                $faceFront.css({
                    'z-index':'992'
                });
            });
        },

        setWidthHeight:function() {
            var self = this,
            $el = this.options.wrapper;


            $el.css({
                // 'width':'25%',
                'height':(base.screenX / 4) / 0.8936
                // 'height' : $el.width(),
            });

            self.newWdith = $el.width();
            self.newHeight = $el.height();

            console.log(self.newWdith + ':' + self.newHeight);

            var $cubeContainer = $el.find('.cube-container'),
            $faceFront = $el.find('.face-front'),
            $faceBack = $el.find('.face-back'),
            cubeTranslation = 'translateZ(-' + Math.round(self.newWdith / 2) + 'px)',
            frontTranslate = 'translateZ(' + Math.round(self.newWdith / 2) + 'px)',
            backTranslate = 'rotateX(-90deg) translateZ(' + Math.round(self.newHeight / 2) + 'px)';

            $faceBack.css({
                '-o-transform' : backTranslate,
                '-ms-transform' : backTranslate,
                '-moz-transform' : backTranslate,
                '-webkit-transform' : backTranslate,
                'transform' : backTranslate
            });

            $faceFront.css({
                '-o-transform' : frontTranslate,
                '-ms-transform' : frontTranslate,
                '-moz-transform' : frontTranslate,
                '-webkit-transform' : frontTranslate,
                'transform' : frontTranslate
            });

            $cubeContainer.css({
                '-o-transform' : cubeTranslation,
                '-ms-transform' : cubeTranslation,
                '-moz-transform' : cubeTranslation,
                '-webkit-transform' : cubeTranslation,
                'transform' : cubeTranslation
            });

        }

    };

    // expose to top level scope
    $.extend(base, {
        EventsList : EventsList
    });

    // trun to jQuery
    $.fn.baseEventsList = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new EventsList($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);


// flipsters
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__flipsters';

    // re turn prototype initial funciton
    var Flipster = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    Flipster.defaults = {
        enableMousewheel : false
    };

    // build prototype
    Flipster.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build();
            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, Flipster.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper;

            if (!($.isFunction($.fn.flipster))) {
                return this;
            }

            $el.flipster(self.options);
            //alert(0);
            return this;
        }

    };

    // expose to top level scope
    $.extend(base, {
        Flipster : Flipster
    });

    // trun to jQuery
    $.fn.baseFlipster = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new Flipster($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);


// jq reflect
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__jqreflect';

    // re turn prototype initial funciton
    var JqReflect = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    JqReflect.defaults = {
        enableMousewheel : false
    };

    // build prototype
    JqReflect.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build();
            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, JqReflect.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper;

            if (!($.isFunction($.fn.reflect))) {
                return this;
            }

            $el.reflect(self.options);

            return this;
        }

    };

    // expose to top level scope
    $.extend(base, {
        JqReflect : JqReflect
    });

    // trun to jQuery
    $.fn.baseJqReflect = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new JqReflect($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);


// careerList
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__careerlist';

    // re turn prototype initial funciton
    var CareerList = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    CareerList.defaults = {
        enableMousewheel : false
    };

    // build prototype
    CareerList.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build()
                .events();
            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, CareerList.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper,
            $item = $el.children('.careerItem'),
            count = $item.length;
            $el.parent('.scroll').css({'height' : base.screenY});
            $item.each(function() {
                self.setRatio(this,count);
            });
            return this;
        },

        events:function() {
            var self = this,
            $el = this.options.wrapper;

            $('.scroll').bind({
                mousemove : function(e){self.stickyMouseScroll(e)}
            });

            $el.on('click','.careerItem',function(e) {
                e.preventDefault();
                $('.scroll').unbind('mousemove');

                var dist = 0;
                var offset = $(this).offset();

                dist = base.screenX / 2 - (offset.left + self.itemWidth / 2) ;

                $el.animate({left : '+='+ dist}, 500, 'easeOutBack',function(){
                    self.extendLoader(e);
                });

                $(this).addClass('thinkLoad');
                grecaptcha.render('recaptcha' + $(this).index(), {
                    'sitekey' : '6LfKUwoTAAAAAJBiBJpIysrYXLdPUUv4tE4RztEY',
                    'theme' : 'light',
                    'callback': function (response) {
                    }
                });
            });

            $('.cClose').on('click',function(){

                $('.careerInner').fadeOut(500);
                $('#loaderScreen').hide();
                $('.careerItem').removeClass('thinkLoad');
                $('.scroll').bind({
                    mousemove : function(e){self.stickyMouseScroll(e)}
                });
                $('#recaptcha' + $(this).index()).empty();
            });
        },

        stickyMouseScroll : function(e){
            var self = this,
            $el = this.options.wrapper,
            percent = e.clientX / base.screenX,
            padding = 70 / base.screenX;

            // if( percent < padding ) {
            //     percent = 0;
            // } else if( percent > (1 - padding)) {
            //     percent = 1;
            // }

            // $el.stop().animate({
            //     left :  - ($el.width() - base.screenX) * percent
            // },500,'easeOutQuad',function(){
            //     // console.log('test ' + location.host);
            //     // var _host = location.host + '/css/temp.css';
            //     // $('head').append( $('<link rel="stylesheet" type="text/css" href="/css/temp.css"/>'));
            // });
            $el.stop().css({
                left :  - ($el.width() - base.screenX) * percent
            });
        },

        extendLoader : function(e) {
            var self = this;

            $('#loaderScreen').animate({
                left : 0,
                width: '100%'
            },500,function(){
                self.showCInner(e)
            });
        },

        showCInner : function(e){
            var $el = $(e.currentTarget),
            $toShow = $($el.find('a').attr('href'));

            $toShow.fadeIn(500);
        },

        setRatio : function(e,c) {
            var $e = $(e),
            $wrapper = $e.parent('.careerUl'),
            wrapperWidth = this.itemWidth * c;

            this.itemWidth = base.screenX / 5.5

            $wrapper.css({
                'width' : wrapperWidth
            }),

            $e.css({
                'width': this.itemWidth,
                'height': base.screenY,
            });
        }

    };

    // expose to top level scope
    $.extend(base, {
        CareerList : CareerList
    });

    // trun to jQuery
    $.fn.baseCareerList = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new CareerList($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);

// custom scroller
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__customscroll';

    // re turn prototype initial funciton
    var CustomScroll = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    CustomScroll.defaults = {
    };

    // build prototype
    CustomScroll.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build(opts);

            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, CustomScroll.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(opts) {
            // var self = this,
            var $el = this.options.wrapper;

            if (!($.isFunction($.fn.mCustomScrollbar))) {
                return this;
            }

            $el.mCustomScrollbar(opts);
            
            return this;
        }
    };

    // expose to top level scope
    $.extend(base, {
        CustomScroll : CustomScroll
    });

    // trun to jQuery
    $.fn.baseCustomScroll = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new CustomScroll($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);

// chuch item
(function(base, $) {

    // check top level object
    base = base || {};

    // create instance name (for html5 data attributes)
    var instanceName = '__churchitem';

    // re turn prototype initial funciton
    var ChurchItem = function($el, opts) {
        return this.initialize($el, opts);
    };

    // function defaults
    ChurchItem.defaults = {
        enableMousewheel : false
    };

    // build prototype
    ChurchItem.prototype = {
        initialize : function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            // build sequence
            this.setData()
                .setOptions(opts)
                .build()
                .events();
            return this;
        },

        setData:function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts) {
            this.options = $.extend(true, {}, ChurchItem.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function() {
            var self = this,
            $el = this.options.wrapper;

            $('.cOverlayWrap').hide();

            return this;
        },

        events:function() {
            var self = this,
            timeout,
            $el = this.options.wrapper;

            $el.on('mouseenter',function(e){
                var $this = $(this);
                var imgUrl = $this.find('a').attr('data-image');
                var target = $this.find('a').attr('data-target');;
                $('.cOverlayWrap').hide();
                self.showOverLay(target,imgUrl);
            }).on('mouseleave',function(e){
                $('.cOverlayWrap').hide();
            });

            $(document).on('mousemove',function() {
                clearTimeout(timeout);
                $('#thechurch').removeClass('inactive');
                timeout = setTimeout(function() {
                    $('#thechurch').addClass('inactive');
                },3000);
            });
        },

        showOverLay:function(tg,source) {
            $('.' + tg).children('.cOverlayWrap').fadeIn(300);
            $('.' + tg).children('.cOverlayWrap').children('img').attr('src',source);
        }

    };

    // expose to top level scope
    $.extend(base, {
        ChurchItem : ChurchItem
    });

    // trun to jQuery
    $.fn.baseChurchItem = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new ChurchItem($this, opts);
            }

        });
    };

}).apply(this, [window.base, jQuery]);

//Crazyslider
(function(base, $) {

    // check top level object
    base = base || {};

    //re turn prototype initial funciton
    var Crazyslider = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    Crazyslider.defaults = {
        initialSlide : 0,
        swapDelay:5000,
        autoPlay:true,
    };

    //build prototype
    Crazyslider.prototype = {
        initialize : function($el,opts){

            this.$el = $el;

            //build sequence
            this.setOptions(opts).build();

            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, Crazyslider.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(){

            var self = this,
            $el = this.options.wrapper;

            self.currentSlideIndex = 0;
            self.slideArr = $el.children();

            var initHidden = self.slideArr.slice(1),
            crazyWrapper = $el.parent(),
            // currentSlideIndex = 0,
            navBtnGroup = crazyWrapper.children('.arr'),
            prevBtn = crazyWrapper.children('#prev'),
            nextBtn = crazyWrapper.children('#next'),
            goCrazy,
            unCrazy,
            timer;

            initHidden.find('.nfBlock').addClass('hid');//initially hide all slides but first
            initHidden.find('.titleBlock').fadeOut(200);
            this.$el.find('.firsttime').removeClass('firsttime');
            
            //auto play
            if(self.options.autoPlay){
                function goCrazy(){
                    timer = setInterval(function(){
                        var $currentSlide = $(self.slideArr[self.currentSlideIndex]),$nextSlide;
                        if(self.currentSlideIndex === self.slideArr.length-1){
                            self.currentSlideIndex = 0;
                        }else{
                            self.currentSlideIndex ++;
                        }
                        $nextSlide = $(self.slideArr[self.currentSlideIndex]);
                        self.handleCrazy(self.slideArr,$currentSlide,$nextSlide);
                    },self.options.swapDelay);
                }

                function unCrazy(){
                    clearInterval(timer);
                }
                
                goCrazy();

                $el.on({
                    mouseenter: unCrazy
                //     mouseleave:goCrazy
                });
            }
            var clickTimeout = function(){
                setTimeout(function(){
                    navBtnGroup.bind('click',clickHandler);
                    
                    if (!timer) {
                        goCrazy();
                    }
                    // goCrazy();
                },600);

            }
            //handle navigation click event

            var clickHandler = function(event){
                self.letsSlide($(event.currentTarget));
                navBtnGroup.unbind("click");
                clearInterval(timer);
                timer = false;
                clickTimeout();
                navBtnGroup.fadeOut().fadeIn();
                // setTimeout(function() {
                //     goCrazy();
                // }, 30000)
            };

            navBtnGroup.on('click',function(e){
                clickHandler(e);
                
            });

        },
        letsSlide : function(target){
            var self = this;
            var $currentSlide = $(self.slideArr[self.currentSlideIndex]),$nextSlide;
            if (target.is('#next')){
                if(self.currentSlideIndex === self.slideArr.length-1){
                    self.currentSlideIndex = 0;
                }else{
                    self.currentSlideIndex ++;
                }
                $nextSlide = $(self.slideArr[self.currentSlideIndex]);

                self.handleCrazy(self.slideArr,$currentSlide,$nextSlide);
            }else{
                if(self.currentSlideIndex === 0){
                    self.currentSlideIndex = self.slideArr.length-1;
                }else{
                    self.currentSlideIndex --;
                }
                $nextSlide = $(self.slideArr[self.currentSlideIndex]);
                self.handleCrazy(self.slideArr,$currentSlide,$nextSlide);
            }
        },
        handleCrazy:function(arr,curr,next){
            var self = this;
            var currTileArr = curr.find('.nfBlock'),currTitleBlock = curr.find('.titleBlock');
            var nextTileArr = next.find('.nfBlock'),nextTitleBlock = next.find('.titleBlock');

            arr.removeClass('active');
            next.addClass('active');
            currTileArr.each(function(){
                $(this).addClass('hid');
                currTitleBlock.fadeOut(200);
            });
            setTimeout(function(){
                if(next.hasClass('active')){
                    nextTileArr.each(function(){
                        $(this).removeClass('hid');
                        nextTitleBlock.fadeIn(200);
                    });
                }
            },400);
        }
    };

    //expose to top level scope
    $.extend(base,{
        Crazyslider : Crazyslider
    });

    //trun to jQuery
    $.fn.baseCrazyslider = function(opts) {
        return this.map(function() {
            var $this = $(this);

            return new Crazyslider($this, opts);

        });
    }

}).apply(this, [window.base, jQuery]);

//Accordion
(function(base, $) {

    // check top level object
    base = base || {};

    //re turn prototype initial funciton
    var AccordionToggle = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    AccordionToggle.defaults = {
        selectorPrefix : 'accordion',
        toggleSerfix:'-toggle',
        bodySerfix : '-body'
    };

    //build prototype
    AccordionToggle.prototype = {
        initialize : function($el,opts){

            this.$el = $el;

            //build sequence
            this.setOptions(opts).build();

            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, AccordionToggle.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(){

            var self = this,
            $el = this.options.wrapper,
            toggler ='.'+self.options.selectorPrefix + self.options.toggleSerfix;
            acBody = '.'+self.options.selectorPrefix + self.options.bodySerfix;
            
            $(acBody).slideUp();

            $el
            .on('click',toggler,function(e){
                e.preventDefault();
                var target = $(this).attr('href');
                if(!$(target).hasClass('active')){
                    $(acBody).removeClass('active').slideUp();
                    $(target).addClass('active').slideDown();
                }else{
                    $(target).removeClass('active').slideUp();
                }
                return false;
            });
        }
    }

    //expose to top level scope
    $.extend(base,{
        AccordionToggle : AccordionToggle
    });

    //trun to jQuery
    $.fn.baseAccordionToggle = function(opts) {
        return this.map(function() {
            var $this = $(this);

            return new AccordionToggle($this, opts);

        });
    }

}).apply(this, [window.base, jQuery]);

//Royalslider
(function(base, $) {

    // check top level object
    base = base || {};

    //create instance name (for html5 data attributes)
    var instanceName = '__royalslider';

    //re turn prototype initial funciton
    var PluginRoyalSlider = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    PluginRoyalSlider.defaults = {
        autoScaleSlider: true,
        imageScaleMode:'fill',
        loop:true,
        slidesSpacing:0,
        autoScaleSliderWidth:1280,
        autoScaleSliderHeight:600
    };

    //build prototype
    PluginRoyalSlider.prototype = {
        initialize : function($el,opts){
            if($el.data(instanceName)){
                return this;
            }

            this.$el = $el;

            //build sequence
            this.setData().setOptions(opts).build();

            return this;
        },

        setData:function(){
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, PluginRoyalSlider.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(){
            if (!($.isFunction($.fn.royalSlider))) {
                return this;
            }

            this.options.wrapper.royalSlider(this.options);
            var self = this,$el = this.options.wrapper;
            

            return this;
        }
    }

    //expose to top level scope
    $.extend(base,{
        PluginRoyalSlider : PluginRoyalSlider
    });

    //trun to jQuery
    $.fn.basePluginRoyalSlider = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginRoyalSlider($this, opts);
            }

        });
    }

}).apply(this, [window.base, jQuery]);

///Slick
(function(base, $) {

    // check top level object
    base = base || {};

    //re turn prototype initial funciton
    var PluginSlick = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    PluginSlick.defaults = {
        autoplay:true,
        autoplaySpeed:2000
    };

    //build prototype
    PluginSlick.prototype = {
        initialize : function($el,opts){

            this.$el = $el;

            //build sequence
            this.setOptions(opts).build();

            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, PluginSlick.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(){
            if (!($.isFunction($.fn.slick))) {
                return this;
            }

            this.options.wrapper.slick(this.options);

            var $el = this.options.wrapper,self = this,crrSlide;
            
            return this;
        }
    }

    //expose to top level scope
    $.extend(base,{
        PluginSlick : PluginSlick
    });

    //trun to jQuery
    $.fn.basePluginSlick = function(opts) {
        return this.map(function() {
            var $this = $(this);
            return new PluginSlick($this, opts);
        });
    }

}).apply(this, [window.base, jQuery]);

// Backstretch

(function(base, $) {

    base = base || {};

    $.extend(base, {

        PluginBackstretch: {

            defaults: {
            },

            initialize: function(opts) {

                this
                    .setOptions(opts)
                    .build();

                return this;
            },

            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts);

                return this;
            },

            build: function() {
                

                return this;
            }

        }

    });

}).apply(this, [window.base, jQuery]);

// Slide Toggler

(function(base, $) {

    // check top level object
    base = base || {};

    //re turn prototype initial funciton
    var SlideToggler = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    SlideToggler.defaults = {

    };

    //build prototype
    SlideToggler.prototype = {
        initialize : function($el,opts){

            this.$el = $el;

            //build sequence
            this.setOptions(opts).build();

            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, SlideToggler.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(){
            if (!($.isFunction($.fn.slick))) {
                return this;
            }

            var $el = this.options.wrapper,self=this;
            
            $el.on('click','.toggler',function(){
                $(this).toggleClass('open');
                $el.find('.toggleTarget').toggleClass('open');
            });

            return this;
        }
    }

    //expose to top level scope
    $.extend(base,{
        SlideToggler : SlideToggler
    });

    //trun to jQuery
    $.fn.baseSlideToggler = function(opts) {
        return this.map(function() {
            var $this = $(this);
            return new SlideToggler($this, opts);
        });
    }

}).apply(this, [window.base, jQuery]);

//Winner Grid

(function(base,$){

    //check top level object
    base = base || {};

    //return costructor init function
    var WinnerGrid = function($el,opts){
        return this.initialize($el,opts);
    };

    //construct prototype
    WinnerGrid.prototype = {
        _autoHide : null,
        //initialize function
        initialize : function($el,opts){
            this.$el = $el;
            
            this.setOptions(opts).build($el,opts);

            return this;
        },

        //set options
        setOptions : function(opts){
            this.options = $.extend(true, {}, WinnerGrid.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },

        //build
        build : function(){
            var self = this,
            $el = this.options.wrapper,
            $item = $el.children();
            for (var i = 0; i < $item.length; i++) {
                var m = i+1;
                if( m%9 === 1 || m%9 === 5 || m%9 === 0){
                    $($item[i]).addClass('left');
                }else if( m%9 === 2 || m%9 === 4 || m%9 === 6 || m%9 === 7){
                    $($item[i]).addClass('bottom');
                }else if( m%9 === 3 || m%9 === 8){
                    $($item[i]).addClass('right');
                }

                if(m%9 === 1||m%9 === 6||m%9 === 8){
                    $($item[i]).addClass('dark');
                }
            }

            self.handleHover($item);

        },
        handleHover : function(obj){
            var self = this;

            obj.mousemove(function(e){
                var rect = $(this).offset();

                var x = e.pageX - rect.left, 
                    y = e.pageY - rect.top,
                    $this = $(this);

                if($this.hasClass('left')){
                    //description at left
                    if(x > $this.width() / 2){
                        //.left open image
                        self.openImage($this);
                    }else{
                        //.left open text
                        self.openText($this);
                    }
                }else if($this.hasClass('bottom')){ 
                    //description at bottom
                    if(y > $this.height() / 2){
                        //.bottom open text
                        self.openText($this);
                    }else{
                        //.bottom open image
                        self.openImage($this);
                    }
                }else if($this.hasClass('right')){
                    if(x > $this.width() / 2){
                        //.right open text
                        self.openText($this);
                    }else{
                        //.right open image
                        self.openImage($this);
                    }
                }
            }).mouseleave(function(){
                self.returnState($(this));
            });
        },
        openImage : function(obj){
            obj.find('img').removeClass('close').addClass('open');
            obj.find('figcaption').removeClass('open').addClass('close');
        },
        openText : function(obj){
            obj.find('img').removeClass('open').addClass('close');
            obj.find('figcaption').removeClass('close').addClass('open');
        },
        returnState: function(obj){
            obj.find('img').removeClass('open close');
            obj.find('figcaption').removeClass('open close');
        }
    }
    //expose to top level scope
    $.extend(base,{
        WinnerGrid : WinnerGrid
    });
    //switch to jQuery
    $.fn.baseWinnerGrid = function(opts){
        return this.map(function(){
            var $this = $(this);

            return new WinnerGrid($this,opts);
        });
    }

}).apply(this,[window.base, jQuery]);

// History Caption

(function(base, $) {

    // check top level object
    base = base || {};

    //re turn prototype initial funciton
    var HistoryCaption = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    HistoryCaption.defaults = {

    };

    //build prototype
    HistoryCaption.prototype = {
        initialize : function($el,opts){

            this.$el = $el;

            //build sequence
            this.setOptions(opts).build().events();

            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, HistoryCaption.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build:function(){
            if (!($.isFunction($.fn.slick))) {
                return this;
            }

            var $el = this.options.wrapper,
                self = this;

            self.adjustTurtleHead();

            return this;
        },
        events:function(){
            var $el = this.options.wrapper,self=this;
            $el.on('click','.toggleOpen a',function(e){
                var $this = $(this);
                e.preventDefault();
                if($el.hasClass('open')){ //if is opened
                    $el.removeClass('open');
                    self.adjustTurtleHead();
                    $this.html('more');
                }else{ //if is closed
                    $el.addClass('open');
                    $el.find('figcaption').css({'top':'0px','margin-top':'0'});
                    $this.html('close');

                }
                // $el.find()
                // $this.html('close');
            });
            $(window).resize(function(){
                self.adjustTurtleHead();
            });
        },

        getTitleHeight:function(){
            var $el = this.options.wrapper;

            return $el.find('.month').height()+$el.find('.title').height()+30;
        },

        adjustTurtleHead:function(){
            var $el = this.options.wrapper,
                self=this,
                turtleHead = self.getTitleHeight();
            $el.find('figcaption').css({'top':'100%','margin-top':'-'+turtleHead+'px'});

        }
    }

    //expose to top level scope
    $.extend(base,{
        HistoryCaption : HistoryCaption
    });

    //trun to jQuery
    $.fn.baseHistoryCaption = function(opts) {
        return this.map(function() {
            var $this = $(this);
            return new HistoryCaption($this, opts);
        });
    }

}).apply(this, [window.base, jQuery]);

//Magnific Pop-up
(function(base, $) {

    // check top level object
    base = base || {};

    //create instance name (for html5 data attributes)
    var instanceName = '__magnific-pop-up';

    //re turn prototype initial funciton
    var PluginMagnific = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    PluginMagnific.defaults = {
    };

    //build prototype
    PluginMagnific.prototype = {
        initialize : function($el,opts){
            if($el.data(instanceName)){
                return this;
            }

            this.$el = $el;

            //build sequence
            this.setData().setOptions(opts).build();


            return this;
        },

        setData:function(){
            this.$el.data(instanceName, this);
            
            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, PluginMagnific.defaults, opts, {
                wrapper: this.$el
            });
            
            return this;
        },

        build:function(){
            if (!($.isFunction($.fn.magnificPopup))) {
                return this;
            }
            var self = this,$el = this.options.wrapper;
            this.options.wrapper.magnificPopup(this.options);
            console.log($el);

            return this;
        }
    }

    //expose to top level scope
    $.extend(base,{
        PluginMagnific : PluginMagnific
    });

    //trun to jQuery
    $.fn.basePluginMagnific = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginMagnific($this, opts);
            }

        });
    }

}).apply(this, [window.base, jQuery]);

//isotope
(function(base, $) {

    // check top level object
    base = base || {};

    //create instance name (for html5 data attributes)
    var instanceName = '__isotope';

    //re turn prototype initial funciton
    var PluginIsotope = function($el, opts) {
        return this.initialize($el, opts);
    };

    //function defaults
    PluginIsotope.defaults = {
        filterEl : $('.categoryFilter'),
    };

    //build prototype
    PluginIsotope.prototype = {
        initialize : function($el,opts){
            if($el.data(instanceName)){
                return this;
            }

            this.$el = $el;

            //build sequence
            this.setData().setOptions(opts).build().events();

            return this;
        },

        setData:function(){
            this.$el.data(instanceName, this);
            
            return this;
        },

        setOptions:function(opts){
            this.options = $.extend(true, {}, PluginIsotope.defaults, opts, {
                wrapper: this.$el
            });
            
            return this;
        },

        build:function(){
            if (!($.isFunction($.fn.isotope))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper;
                
            $el.isotope(this.options);

            return this;
        },
        events:function(){
           var self = this,
                $el = this.options.wrapper,
                $filter  = this.options.filterEl;
            $filter.on('click','li',function(){
                var $this = $(this);
                var filterValue = $this.attr('data-filter');
                self.options.filter =filterValue;
                $el.isotope(self.options);
                $this.parent().children('li').removeClass('active');
                $this.addClass('active');
            }); 
        }
    }

    //expose to top level scope
    $.extend(base,{
        PluginIsotope : PluginIsotope
    });

    //trun to jQuery
    $.fn.basePluginIsotope = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginIsotope($this, opts);
            }

        });
    }

}).apply(this, [window.base, jQuery]);

// History Appear Animate
(function(agenda, $) {

    agenda = agenda || {};

    var instanceName = '__animate';

    var PluginAnimate = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginAnimate.defaults = {
        accX: 0,
        accY: -150,
        delay: 1
    };

    PluginAnimate.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginAnimate.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            var self = this,
                $el = this.options.wrapper,
                delay = 0;

            $el.addClass('appear-animation');

            if (!$('html').hasClass('no-csstransitions') && $(window).width() > 767) {

                $el.appear(function() {

                    var columnPosition = $el.parents('.salvattorColumn').index();
                    
                    var animationType = (columnPosition == 0)? 'bounceInLeft':'bounceInRight';

                    $el.addClass(animationType);

                    setTimeout(function() {
                        $el.addClass('appear-animation-visible');
                    }, 600);

                }, {
                    accX: self.options.accX,
                    accY: self.options.accY
                });

            } else {

                $el.addClass('appear-animation-visible');

            }

            return this;
        }
    };

    // expose to scope
    $.extend(agenda, {
        PluginAnimate: PluginAnimate
    });

    // jquery plugin
    $.fn.PluginAnimate = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginAnimate($this, opts);
            }

        });
    };

}).apply(this, [window.agenda, jQuery]);

