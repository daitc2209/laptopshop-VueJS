<template>


<div id="laptop" class="container product-cards p-0 mt-0">
    <h1 class="text-center">Laptop</h1>
    <div class="product-owl-carousel owl-carousel">
      <div v-for="item in laptopCategory" :key="item.id">
        <div class="card">
          <img :src="'/src/images/product/' + item.img" alt="">
          <div class="card-body">
            <h3>{{ item.name }}</h3>
            <p>Danh mục laptop.</p>
            <div class="star">
              <i class="fas fa-star checked"></i>
              <i class="fas fa-star checked"></i>
              <i class="fas fa-star checked"></i>
              <i class="fas fa-star checked"></i>
              <i class="fas fa-star checked"></i>
            </div>
            <h5>
              {{ formatPrice(item.price) }}
              <span>
                <a :href="'/store/' + item.id"><i class="fa-solid fa-eye"></i></a>
                &emsp;
                <a :href="'/cart/add-cart/' + item.id"><i class="fa-solid fa-cart-shopping"></i></a>
              </span>
            </h5>
          </div>

      </div>
      </div>
    </div>
  </div>

  <div id="keyboard" class="container product-cards p-0 mt-0">
    <h1 class="text-center">Keyboard</h1>
    <div class="product-owl-carousel owl-carousel">
      <div v-for="item in keyboardCategory" :key="item.id" class="card">
        <img :src="'/src/images/product/'+item.img" alt="">
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <div class="star">
            <i class="fas fa-star checked"></i> 
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i> 
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
          </div>
          <h5>
            {{ formatPrice(item.price) }}
            <span>
              <a :href="`/store/${item.id}`"><i class="fa-solid fa-eye"></i></a>
              &emsp;
              <a :href="`/cart/add-cart/${item.id}`"><i class="fa-solid fa-cart-shopping"></i></a>
            </span>
          </h5>
        </div>
      </div>
    </div>
  </div>

  <div id="mouse" class="container product-cards p-0 mt-0">
    <h1 class="text-center">Mouse</h1>
    <div class="product-owl-carousel owl-carousel">
      <div v-for="item in mouseCategory" :key="item.id" class="card">
        <img :src="'/src/images/product/' + item.img" alt="">
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <div class="star">
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
          </div>
          <h5>
            {{ formatPrice(item.price) }}
            <span>
              <a :href="'/store/' + item.id"><i class="fa-solid fa-eye"></i></a>
              &emsp;
              <a :href="'/cart/add-cart/' + item.id"><i class="fa-solid fa-cart-shopping"></i></a>
            </span>
          </h5>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import Products from '../../../service/Product'
export default {
  data() {
    return {
      laptopCategory: [],
      mouseCategory: [],
      keyboardCategory: []
    };
  },
  methods: {
    formatPrice(price) {
      const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(price);
    },
    getAllProduct(){
      Products.getAllProduct().then((res) => {
        console.log(res)
        this.laptopCategory = res.data.data.laptop;
        this.mouseCategory = res.data.data.mouse;
        this.keyboardCategory = res.data.data.keyboard;
      })
      .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getAllProduct();
  },
  updated(){
    $(".product-owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      items: 4,
      dots: false,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      smartSpeed: 1000,
      autoHeight: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },
        360: {
          items: 2,
        },
        576: {
          items: 2,
        },
        992: {
          items: 4,
        },
        1200: {
          items: 4,
        }
      }
    });
  }
}
</script>

<style>

</style>