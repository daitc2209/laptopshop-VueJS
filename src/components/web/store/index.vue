<template>
    <div>
    <head>
        <title>Store Page</title>
    </head>
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
                  <div v-else class="alert alert-danger">There are {{ param.cart }} products in cart / {{ errorMsg }} products left in stock</div>
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
                          <option value="all">ALL</option>
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
                    <div v-if="listProduct.length > 0">
                      <div v-for="item in listProduct" :key="item.id" class="col-lg-3 col-sm-6 col-6">
                        <div class="product-item">
                          <div class="pi-pic">
                            <img :src="'/images/product/' + item.thumbnail" alt="">
                            <ul>
                              <li class="w-icon active">
                                <a :href="'/cart/add-cart/' + item.id"><i class="fa-solid fa-cart-shopping"></i></a>
                              </li>
                              <li class="quick-view"><a :href="'/store/' + item.id">+ Quick View</a></li>
                            </ul>
                          </div>
                          <div class="pi-text">
                            <h5>{{ item.name }}</h5>
                            <div class="product-price">
                              {{ formatPrice(item.price - (item.price * item.discount / 100)) }}đ
                              <del v-if="item.discount > 0">{{ formatPrice(item.price) }}đ</del>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="col-lg-3 col-sm-6 col-6">
                        Not found products
                      </div>
                    </div>
                    <div v-if="listProduct.length > 0">
                      <ul class="pagination mt-4" id="pagination"></ul>
                      <input type="hidden" id="page" name="page" :value="currentPage" />
                    </div>
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
  export default {
    name: 'index',
    data() {
      return {
        formFilterProduct: {
          sort: 'low-high',
          cateogryName: 'all',
          brandName: 'all',
          price: 'all',
        },
        listProduct: [],
        category: [],
        brand: [],
        currentPage: '',
        totalPages: '',
        errorMsg: '',
      };
    },
    mounted() {
      this.Pagination();
    },
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat().format(price);
      },
      submitForm() {
        this.currentPage = 1;
        // Perform form submission or API request with updated formFilterProduct data
        // Update listProduct, totalPages, errorMsg based on the response
        // For example:
        // axios.post('/store', this.formFilterProduct)
        //   .then(response => {
        //     this.listProduct = response.data.listProduct;
        //     this.totalPages = response.data.totalPages;
        //     this.errorMsg = response.data.errorMsg;
        //     this.initializePagination();
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
      },
      Pagination() {
        const totalPages = this.totalPages || 1;
        const currentPage = this.currentPage || 1;
        $('#pagination').twbsPagination({
          totalPages: totalPages,
          visiblePages: 3,
          startPage: currentPage,
          onPageClick: (event, page) => {
            if (this.currentPage !== page) {
              this.currentPage = page;
              this.submitForm();
            }
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>

  </style>