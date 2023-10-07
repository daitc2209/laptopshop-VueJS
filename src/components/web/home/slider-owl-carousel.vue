<template>
  <div class="slider-owl-carousel owl-carousel">
		<div class="slider-item">
			<div class="content">
				<h3>Biggest Clothe Sale <br> <span>Up To 50% Off</span></h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa, totam sed maxime animi facilis!</p>
				<a href="/store"><button id="shopnow">Shop Now</button></a>
			</div>
			<div class="img"><img src="../../../images/slide/ASUS-1.png" alt=""></div>
		</div>
		<div class="slider-item">
			<div class="content">
				<h3>Biggest Clothe Sale <br> <span>Up To 75% Off</span></h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa, totam sed maxime animi facilis!</p>
				<a href="/store"><button id="shopnow">Shop Now</button></a>
			</div>
			<div class="img"><img src="../../../images/slide/DELL-1.png" alt=""></div>
		</div>
		<div class="slider-item">
			<div class="content">
				<h3>Biggest Clothe Sale <br> <span>Up To 95% Off</span></h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa, totam sed maxime animi facilis!</p>
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
