<template>
  <div>
  <button class="backtop" @click="scrollToTop">
    <i class="fa fa-angle-up"></i></button>

  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      // $(window).scroll(function() {
      //   if ($(this).scrollTop()) {
      //     $('.backtop').fadeIn();
      //   } else {
      //     $('.backtop').fadeOut();
      //   }
      // }); 
        $('html , body').animate({ scrollTop: 0 }, 500);

    }
  }
};
</script>

<style>

</style>