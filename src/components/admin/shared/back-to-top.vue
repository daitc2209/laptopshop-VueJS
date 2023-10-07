<template>
  <button class="backtop" @click="scrollToTop">
    <i class="fa fa-angle-up"></i></button>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      $('html , body').animate({ scrollTop: 0 }, 500);
    }
  }
};
</script>

<style>

</style>