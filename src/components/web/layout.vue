<style>
@import url(../../assets/web/css/web.css);
</style>

<script >
import Header from '../web/shared/header.vue';
import Footer from '../web/shared/footer.vue';
import Menu from '../web/shared/menu.vue';
import Backtotop from '../web/shared/back-to-top.vue';
// import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js'
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js'
// import 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js'
// import '../../assets/web/js/main.js'
// import '../../assets/web/js/show-file-image_choosed.js'
// import '../../assets/web/js/product-owl-carousel.js'
// import '../../assets/web/js/back-to-top.js'

export default{
  components: {
    Header,
    Footer,
    Menu,
    Backtotop,
  }
}
</script>

<template>
  <div>
    <Header />
    <Menu />
    <div class="content-wrapper">
      <!-- Ở đây cần import content  -->
      <router-view></router-view>
    </div>

    <Backtotop />
    <Footer />
  </div>
</template>

