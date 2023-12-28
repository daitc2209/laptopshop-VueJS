
<template>
  <section class="product-detail">
    <div id="toast">
    </div>
    <div class="container">
      <div class="row">
        <div class="breadcrumbs d-flex flex-row align-items-center col-12">
          <ul>
            <li><a href="/home">Trang chủ</a></li>
            <li><a href="/store"><i class="fa fa-angle-right" aria-hidden="true"></i>Cửa hàng</a></li>
            <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Sản phẩm</a></li>
          </ul>
        </div>
        <div class="col-md-5 order-2 order-md-1">
          <img :src="product.img" alt="">
        </div>
        <div class="col-md-7 order-1 order-md-2">
          <h1>{{ product.name }}</h1>
          <div class="pd-rating mb-2">
            <i class="fa fa-star checked"></i>
            <i class="fa fa-star checked"></i>
            <i class="fa fa-star checked"></i>
            <i class="fa fa-star checked"></i>
            <i class="fa fa-star checked"></i>
          </div>
          <div v-for="item in product.description.split(',')" :key="item">
            <p>{{ item }}</p>
          </div>
          <h3>
            {{ formatPrice(product.price - (product.price * product.discount / 100)) }}
            <del v-if="product.discount > 0">{{ formatPrice(product.price) }}</del>
          </h3>
          <h5>
            Discount: {{ product.discount }}%
          </h5>
          <form @submit.prevent="addToCart()">
            <input name="productId" :value="product.id" hidden>
            <div class="quantity">
              <div class="pro-qty">
                <span @click="decFunction(1)" class="dec qtybtn">-</span>
                <input v-if="!cart.num" class="id-1" id="quanty" type="text" value="1" name="numProduct">
                <input v-else class="id-1" id="quanty" type="text" :value="cart.num" name="numProduct">
                <span @click="incFunction(1)" class="inc qtybtn">+</span>
              </div>
              <a><button class="primary-btn pd-cart" type="submit">Thêm vào giỏ hàng</button></a>
              <a class="favour-container"><button class="favour-btn" @click="addToFavour(item.id)"><i class="fa-solid fa-heart"></i></button></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { decFunction, incFunction, showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import productApi from "../../../service/Product";
import Cart from "../../../service/Cart";
import Favour from "../../../service/favour";
export default {
  data() {
    return {
      product: {
        name: '',
        img: '',
        description: '',
        price: 0,
        discount: 0,
        id: ''
      },
      err: '',
      success: '',
      cart: {
        productId: "",
        num:""
      }
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

    decFunction(num) {
      this.cart.num = decFunction(num);
    },
    incFunction(num) {
      this.cart.num = incFunction(num)
    },

    async addToCart() {
      this.cart.productId=this.product.id

      Cart.addToCart(this.cart).then(()=>{
        let message = 'Thêm vào giỏ hàng thành công'
        showSuccessToast(message)
      }).catch((err) => { 
        showErrorToast()
      })
    },
    async addToFavour(id){
      if(sessionStorage.getItem("login"))
      {
        Favour.addToFavour(id).then(()=>{
          let message = 'Đã thêm sản phẩm vào yêu thích'
          showSuccessToast(message)
        }).catch((err)=>{
          showErrorToast()
        })
      }
      else{
        sessionStorage.setItem("err",true)
        this.$router.push("/auth/sign-in")
      }
    },
    async getProductbyId(id){
      try{
        const res = await productApi.getProductById(id)
        this.product = res.data
      }
      catch(err) {
        console.log("err: " + err)
      }
    },
  },
  mounted() {
    this.getProductbyId(this.$route.params.id);
  },
  watch(){
    decFunction(num) 
    incFunction(num)
  }
};
</script>

<style>

</style>