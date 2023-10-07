
$(window).scroll(function() {
	if ($(this).scrollTop()) {
		$('.backtop').fadeIn();
	} else {
		$('.backtop').fadeOut();
	}
});
