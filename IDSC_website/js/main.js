$(document).ready(function(){
	//$("#demosMenu").change(function(){
	//  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	//});

	$('#fullpage').fullpage({
		verticalCentered: true,
		sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#77A0C1'],
		css3: true,
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Top page', 'Product page', 'Characteristic page', 'Spec page', 'Last  page'],
		afterRender: function(){
			//playing the video
			$('video').get(0).play();
		}
	});
});