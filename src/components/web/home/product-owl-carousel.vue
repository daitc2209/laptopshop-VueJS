<template>

  <div id="toast">
    </div>

<div id="laptop" class="container product-cards p-0 mt-0">
    <h1 class="text-center">Laptop</h1>
    <div class="product-owl-carousel owl-carousel">
      <div v-for="item in laptopCategory" :key="item.id">
        <div class="home-product card">
          <div class="home-product-item__favourite">
              <span>Giảm {{ item.discount }}%</span>
          </div>
          <img :src="item.img" alt="">
          <div class="card-body">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
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
                <a @click="addToFavour(item.id)"><i class="fa-solid fa-heart"></i></a>
                &emsp;
                <a @click="addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i></a>
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
        <div class="home-product-item__favourite">
            <span>Giảm {{ item.discount }}%</span>
        </div>
        <img :src="item.img" alt="">
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p class="item-description">{{ item.description }}</p>
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
              <a @click="addToFavour(item.id)"><i class="fa-solid fa-heart"></i></a>
              &emsp;
              <a @click="addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i></a>
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
        <div class="home-product-item__favourite">
            <span>Giảm {{ item.discount }}%</span>
        </div>
        <img :src="item.img" alt="">
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p class="item-description">{{ item.description }}</p>
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
              <a @click="addToFavour(item.id)"><i class="fa-solid fa-heart"></i></a>
              &emsp;
              <a @click="addToCart(item.id)" ><i class="fa-solid fa-cart-shopping"></i></a>
            </span>
          </h5>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { showSuccessToast, showErrorToast, showWarnToast } from "../../../assets/web/js/main";
// import Products from '../../../service/Product'
import productApi from '../../../service/Product';
import Cart from '../../../service/Cart';
import Favour from '../../../service/favour';
export default {
  data() {
    return {
      laptopCategory: [],
      mouseCategory: [],
      keyboardCategory: [],
      success: '',
      cart:{
        productId:'',
        num:'',
      }
    }
  },
  methods: {
    formatPrice(price) {
      const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(price);
    },
    async getAllProduct(){
      const res = await productApi.getAllProduct();
      this.laptopCategory = res.data.laptop;
      this.mouseCategory = res.data.mouse;
      this.keyboardCategory = res.data.keyboard;
    },
    async addToCart(id){
      this.cart.productId=id
      console.log("id: "+id)
      Cart.addToCart(this.cart).then(()=>{
        let message = 'Thêm vào giỏ hàng thành công'
        showSuccessToast(message)
      }).catch((err)=>{
        showErrorToast()
      })
    },
    async addToFavour(id){
      if(sessionStorage.getItem("login"))
      {
        Favour.addToFavour(id).then((res)=>{
          if(res.data.responseCode == 1)
          {
            console.log("res.data.data.responseCode: "+res.data.data.responseCode)
            let message = 'Đã thêm sản phẩm vào yêu thích !!'
            showSuccessToast(message)
          }
          if(res.data.responseCode == 2)
          {
            console.log("res.data.data.responseCode: "+res.data.data.responseCode)
            let message = 'Sản phẩm đã có trong yêu thích !!'
            showWarnToast(message)
          }
        }).catch((err)=>{
          showErrorToast()
        })
      }
      else{
        sessionStorage.setItem("err",true)
        this.$router.push("/auth/sign-in")
      }
    },
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
.card {
  position: relative;
  overflow: hidden;
}

.card img {
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.1);
}

.card:hover .home-product-item__favourite{
  opacity: 1;
}
</style>