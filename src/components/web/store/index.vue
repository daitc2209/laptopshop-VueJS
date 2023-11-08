<template>
  <div>

    <head>
      <title>Store Page</title>
    </head>

    <div id="toast">
    </div>

    <section class="store">
      <div class="container">
        <div class="row">
          <div>
            <div class="breadcrumbs d-flex flex-row align-items-center col-12">
              <ul>
                <li><a href="/home">Home</a></li>
                <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Store</a></li>
              </ul>
            </div>
            <form @submit.prevent="submitForm" id="formStore">
              <div v-if="errorMsg">
                <div v-if="!param.cart" class="alert alert-danger">{{ errorMsg }} products left in stock</div>
                <div v-else class="alert alert-danger">There are {{ param.cart }} products in cart / {{ errorMsg }}
                  products left in stock</div>
              </div>
              <div class="product-show-option">
                <div class="row">
                  <div class="col-md-3 col-6 p-1">
                    <div class="select-option">
                      <p>Sort: </p>
                      <select class="sort" v-model="formFilterProduct.sort" @change="submitForm">
                        <option value="low-high">Low to High Price</option>
                        <option value="high-low">High to Low Price</option>
                        <option value="a-z">Name: A - Z</option>
                        <option value="z-a">Name: Z - A</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 p-1">
                    <div class="select-option">
                      <p>Category: </p>
                      <select class="category" v-model="formFilterProduct.cateogryName" @change="submitForm">
                        <option value="all">ALL</option>
                        <option v-for="item in category" :value="item.name" :key="item.name">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 p-1">
                    <div class="select-option">
                      <p>Brand: </p>
                      <select class="brand" v-model="formFilterProduct.brandName" @change="submitForm">
                        <option value="all" selected>ALL</option>
                        <option v-for="item in brand" :value="item.name" :key="item.name">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 p-1">
                    <div class="select-option">
                      <p>Price: </p>
                      <select class="price" v-model="formFilterProduct.price" @change="submitForm">
                        <option value="all">ALL</option>
                        <option value="1-5">1 - 5 million</option>
                        <option value="5-10">5 - 10 million</option>
                        <option value="10-100">10 - 100 million</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-list">
                <div class="row">
                  <template v-if="listProduct.length > 0">
                    <template v-for="item in listProduct" >
                      <div class="col-lg-3 col-sm-6 col-6">
                        <div class="product-item" :key="item.id">
                          <div class="pi-pic">
                            <img :src="'src/images/product/' + item.img" alt="">
                            <ul>
                              <li class="w-icon active">
                                <a @click="addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i></a>
                              </li>
                              <li class="quick-view"><a :href="'/store/' + item.id">+ Quick View</a></li>
                            </ul>
                          </div>
                          <div class="pi-text">
                            <h5>{{ item.name }}</h5>
                            <div class="product-price">
                              {{ formatPrice(item.price - (item.price * item.discount / 100)) }}
                              <del v-if="item.discount > 0">{{ formatPrice(item.price) }}</del>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <div v-else>
                    <div class="col-lg-3 col-sm-6 col-6">
                      Not found products
                    </div>
                  </div>
                  <template v-if="listProduct.length > 0">
                    <ul class="pagination mt-4" id="pagination">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <input hidden="" id="page" name="page" :value="currentPage" />
                  </template>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script>
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import Products from '../../../service/Product';
import Cart from '../../../service/Cart';
export default {
  data() {
    return {
      formFilterProduct: {
        sort: 'low-high',
        cateogryName: 'all',
        brandName: 'all',
        price: 'all',
      },
      currentPage: '1',
      listProduct: [],
      category: [],
      brand: [],
      totalPages: '',
      errorMsg: '',
      success: '',
      cart:{
        productId:'',
        num:'',
      }
    };
  },
  mounted() {
    this.getFilterProduct();
    this.Pagination();
  },
  methods: {
    formatPrice(price) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
			});
			return formatter.format(price);
    },
    getFilterProduct(){
      Products.getFilterProduct(
        this.formFilterProduct.sort,
        this.formFilterProduct.cateogryName,
        this.formFilterProduct.brandName,
        this.formFilterProduct.price,this.currentPage).then((res) =>{
        
        this.listProduct = res.data.data.listProduct
        this.brand = res.data.data.brand
        this.category = res.data.data.category
        this.totalPages = res.data.data.totalPages
        console.log("total pages: "+this.totalPages)
        
      }).catch(err => {console.log("loi store Get !!!!")})
    },
    async addToCart(id){
      this.cart.productId=id
      console.log("id: "+id)
      Cart.addToCart(this.cart).then(()=>{
        console.log("them thanh cong o trang store")
        let message = 'Thêm vào giỏ hàng thành công'
        showSuccessToast(message)
      }).catch((err)=>{
        console.log("err o trang store khi them gio hang: "+err)
        showErrorToast()
      })
    },
    showSuccessToast(message){
      showSuccessToast(message)
    },
     showErrorToast(){
      showErrorToast()
    },



    submitForm() {
      this.currentPage = 1;
      Products.postFilterProduct(this.formFilterProduct,this.currentPage)
      .then((res)=>{
        this.listProduct = res.data.data.listProduct
        this.brand = res.data.data.brand
        this.category = res.data.data.category
        this.totalPages = res.data.data.totalPages
        console.log("total pages: "+this.totalPages)
        
      }).catch(err => {console.log("loi store Post !!!!")})
    },
    Pagination() {
      const totalPages = this.totalPages || 1;
      const currentPage = this.currentPage || 1;
      console.log("totalpage: "+totalPages)
      console.log("currentPage: "+currentPage)
      $('#pagination').twbsPagination({
        totalPages: totalPages,
        visiblePages: 4,
        startPage: currentPage,
        onPageClick: (event, page) => {
          if (this.currentPage !== page) {
            // this.currentPage = page;
            // this.submitForm();
            $('#page').val(page);
						$('#formStore').submit();
          }
        },
      });
    },
  },
};
</script>
  
<style>
</style>