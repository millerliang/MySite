$(window).load(function () {
	/* slides */
	var slideinterval = 2000;
	var slideinterval2 = 4000;
	var slides = $('.slides .slide');
	var slides_count = slides.length;
	var i = 0;
	var timer;
	var firsttime = 0;
	function starttimer(interval) {
		timer = setInterval(function () {
			$(slides[i]).addClass("current");
			$(slides[i]).delay(slideinterval2).queue(function () {
				$(this).removeClass('current').dequeue();
			});
			i++;
			if (i === slides_count) {
				i = 0;
			}
			if (firsttime === 0) {

				firsttime = 1;
				clearInterval(timer);
				starttimer(slideinterval2);
			}
		}, interval);
	}
	starttimer(slideinterval);
});