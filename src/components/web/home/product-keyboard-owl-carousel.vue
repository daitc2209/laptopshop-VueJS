<template>
  <section id="keyboard" class="container product-cards p-0 mt-0">
    <h1 class="text-center">Keyboard</h1>
    <div class="product-owl-carousel owl-carousel">
      <div v-for="item in keyboardCategory" :key="item.id" class="card">
        <img :src="`/images/product/${item.thumbnail}`" alt="">
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
  </section>

</template>

<script>
export default {
    data() {
    return {
      keyboardCategory: [
        
      ], // Dữ liệu từ keyboardCategory sẽ được gán vào đây
    };
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString("vi-VN") + "đ";
    },
  }
}
</script>

<style>

</style>