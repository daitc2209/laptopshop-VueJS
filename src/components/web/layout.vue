<style>
@import url(../../assets/web/css/web.css);
</style>

<script >
import Header from '../web/shared/header.vue';
import Footer from '../web/shared/footer.vue';
import Menu from '../web/shared/menu.vue';
import Backtotop from '../web/shared/back-to-top.vue';


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

    <!-- Ở đây cần import content  -->
    <router-view></router-view>

    <Backtotop />
    <Footer />
  </div>
</template>

