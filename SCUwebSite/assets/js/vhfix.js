// JavaScript Document
$(window).load(function () {
	"use strict";
	/* fierstview fix */
	let vh = window.innerHeight * 0.01; /* convert vh */
	document.documentElement.style.setProperty('--vh', `${vh}px`); /* root var */
	let currentWidth = window.innerWidth;
	window.addEventListener('resize', () => {
		if (currentWidth == window.innerWidth) {
			return;
		}
		currentWidth = window.innerWidth;
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
});