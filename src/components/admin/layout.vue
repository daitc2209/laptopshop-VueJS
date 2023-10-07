<style>
@import url(../../assets/admin/css/style.css);
@import url(../../assets/admin/css/adminlte.min.css);
</style>

<script >
import Style from './shared/style.vue'
// import ScriptShared from './shared/script.vue';
import Header from './shared/header.vue';
import Footer from './shared/footer.vue';
import Menu from './shared/menu.vue';
import Backtotop from './shared/back-to-top.vue';


export default{
  components: {
    Style,
    // ScriptShared,
    Header,
    Footer,
    Menu,
    Backtotop,
  }
}
</script>

<template>
  <div>
    <head>
      <Style/>
    </head>
    <Header />
    <Menu />

    <!-- Ở đây cần import content  -->
    <router-view></router-view>

    <Backtotop />
    <Footer />
  </div>
</template>

