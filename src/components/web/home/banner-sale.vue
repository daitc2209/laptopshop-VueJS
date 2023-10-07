<template>
  <section class="banner-sale">
		<div class="content">
			<h1>Get Up To 50% Off</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, animi?</p>
			<ul class="timer">
				<li class="d-inline-flex flex-column justify-content-center align-items-center p-4">
					<div id="day" class="timer_num text-white">{{ days }}</div>
					<div class="timer_unit text-white">Day</div>
				</li>
				<li class="d-inline-flex flex-column justify-content-center align-items-center p-4">
					<div id="hour" class="timer_num text-white">{{ hours }}</div>
					<div class="timer_unit text-white">Hours</div>
				</li>
				<li class="d-inline-flex flex-column justify-content-center align-items-center p-4">
					<div id="minute" class="timer_num text-white">{{ minutes }}</div>
					<div class="timer_unit text-white">Mins</div>
				</li>
				<li class="d-inline-flex flex-column justify-content-center align-items-center p-4">
					<div id="second" class="timer_num text-white">{{ seconds }}</div>
					<div class="timer_unit text-white">Sec</div>
				</li>
			</ul>
			<div id="bannerbtn"><a href="/store"><button>SHOP NOW</button></a></div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
    return {
      days: "03",
      hours: "15",
      minutes: "45",
      seconds: "23",
    };
  },
  mounted() {
    this.initTimer();
  },
  methods: {
    initTimer() {
      if (document.getElementsByClassName("timer").length) {
        var date = new Date();
        date.setDate(date.getDate() + 3);
        var target_date = date.getTime();

        var d = document.getElementById("day");
        var h = document.getElementById("hour");
        var m = document.getElementById("minute");
        var s = document.getElementById("second");

        setInterval(() => {
          var current_date = new Date().getTime();
          var seconds_left = (target_date - current_date) / 1000;

          this.days = String(parseInt(seconds_left / 86400)).padStart(2, "0");
          seconds_left = seconds_left % 86400;

          this.hours = String(parseInt(seconds_left / 3600)).padStart(2, "0");
          seconds_left = seconds_left % 3600;

          this.minutes = String(parseInt(seconds_left / 60)).padStart(2, "0");
          this.seconds = String(parseInt(seconds_left % 60)).padStart(2, "0");
        }, 1000);
      }
    },
  },
}
</script>

<style>
@import url("../../../assets/web/css/banner-sale.css");
</style>