<template>
  <div class="slider-owl-carousel owl-carousel">
		<div class="slider-item">
			<div class="content">
				<h3>Biggest Clothe Sale <br> <span>Up To 50% Off</span></h3>
				<p>Immerse yourself in seamless computing with Asus's range of sleek and powerful laptops, designed for the modern user.</p>
				<a href="/store"><button id="shopnow">Shop Now</button></a>
			</div>
			<div class="img"><img src="../../../images/slide/ASUS-1.png" alt=""></div>
		</div>
		<div class="slider-item">
			<div class="content">
				<h3>Biggest Clothe Sale <br> <span>Up To 75% Off</span></h3>
				<p>Experience seamless productivity and exceptional craftsmanship with Dell's premium laptops, designed to empower your work.</p>
				<a href="/store"><button id="shopnow">Shop Now</button></a>
			</div>
			<div class="img"><img src="../../../images/slide/DELL-1.png" alt=""></div>
		</div>
		<div class="slider-item">
			<div class="content">
				<h3>Biggest Clothe Sale <br> <span>Up To 95% Off</span></h3>
				<p>Experience the perfect blend of performance and elegance with HP laptops, designed to fuel your productivity.</p>
				<a href="/store"><button id="shopnow">Shop Now</button></a>
			</div>
			<div class="img"><img src="../../../images/slide/HP-1.png" alt=""></div>
		</div>
	</div>
</template>

<script>

export default{
	mounted(){
		$(".slider-owl-carousel").owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			items: 1,
			dots: false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			smartSpeed: 2000,
			autoHeight: false,
			autoplay: true,
		});
	}
}
</script>

<style scoped>

</style>
