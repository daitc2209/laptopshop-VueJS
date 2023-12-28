<template>
  <div>
    <head>
      <title>Cửa hàng</title>
    </head>
    <div id="toast">
    </div>
    <section class="store">
      <div class="container">
        <div class="row">
          <div>
            <div class="breadcrumbs d-flex flex-row align-items-center col-12">
              <ul>
                <li><a href="/home">Trang chủ</a></li>
                <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Cửa hàng</a></li>
              </ul>
            </div>
            <div id="formStore">
              <div class="product-show-option col-4">
                <div class="row">
                  <div class="p-3 m-1">
                    <p>Sắp xếp: </p>
                    <div class="select-option col-11">
                      <select class="sort" v-model="formFilterProduct.sort" @change="getFilterProduct()">
                        <option value="low-high">Giá thấp đến cao</option>
                        <option value="high-low">Giá cao đến thấp</option>
                        <option value="a-z">Tên: A - Z</option>
                        <option value="z-a">Tên: Z - A</option>
                      </select>
                    </div>
                  </div>
                  <div class="p-3 m-1">
                    <p>Danh mục: </p>
                    <div class="select-option col-11">
                      <select class="category" v-model="formFilterProduct.cateogryName" @change="getFilterProduct()">
                        <option value="all">Tất cả</option>
                        <option v-for="item in category" :value="item.name" :key="item.name">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="p-3 m-1">
                    <p>Thương hiệu: </p>
                    <div class="select-option col-11">
                      <select class="brand" v-model="formFilterProduct.brandName" @change="getFilterProduct()">
                        <option value="all" selected>Tất cả</option>
                        <option v-for="item in brand" :value="item.name" :key="item.name">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="p-3 m-1">
                    <div id="price-range-container">
                      <label for="price-range-slider">Khoảng giá:</label>
                      <div id="price-range-slider"></div>
                      <div id="price-values">
                        <span class="price-values__min">{{ formatPrice(formFilterProduct.minPrice) }}</span>
                        <span class="price-values__max" style="margin-left: 20px;">{{ formatPrice(formFilterProduct.maxPrice) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-list ">
                <div class="row col-12">
                  <template v-if="listProduct.length > 0">
                    <div class="product-item col-lg-3 col-md-6 col-sm-6 col-12 " v-for="item in listProduct"  :key="item.id">
                        <div class="product-item" >
                            <div class="pi-pic " >
                              <img :src="item.img" alt="">
                              <ul>
                                <li class="w-icon active">
                                  <a @click="addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i></a>
                                </li>
                                <li class="w-icon active">
                                  <a @click="addToFavour(item.id)"><i class="fa-solid fa-heart"></i></a>
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
                            <div class="home-product-item__favourite">
                                <span>Giảm {{ item.discount }}%</span>
                            </div>
                        </div>
                    </div>
                  </template>
                  <div v-else>
                    <div class="col-lg-3 col-sm-6 col-6">
                      Không có sản phẩm phù hợp
                    </div>
                  </div>
                  <div class="pagination" id="pagination" v-if="paginationButtons.length >= 2">
                    <button v-for="page in paginationButtons" :key="page" 
                    :class="{ active: currentPage === page }" 
                    @click="PaginationButton(page).handleClick()">
                      {{ page }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script>
import { showSuccessToast, showErrorToast, showErrorToastMess } from "../../../assets/web/js/main";
import productApi from '../../../service/Product';
import Cart from '../../../service/Cart';
import Favour from '../../../service/favour';
export default {
  data() {
    return {
      formFilterProduct: {
        sort: 'low-high',
        cateogryName: 'all',
        brandName: 'all',
        minPrice: 0,
        maxPrice: 30000000
      },
      currentPage: '',
      paginationButtons:[],
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
  methods: {
    formatPrice(price) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
			});
			return formatter.format(price);
    },
    async getFilterProduct(){
      try{
        const res = await productApi.getFilterProduct(
          this.formFilterProduct.sort,
          this.formFilterProduct.cateogryName,
          this.formFilterProduct.brandName,
          this.formFilterProduct.minPrice,
          this.formFilterProduct.maxPrice,this.currentPage)
        this.listProduct = res.data.listProduct;
        this.brand = res.data.brand;
        this.category = res.data.category;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
    
        this.SetupPagination(this.totalPages);

      }
      catch(err){
        console.log("loi store Get: "+err)
      }
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
        Favour.addToFavour(id).then(()=>{
          let message = 'Đã thêm sản phẩm vào yêu thích'
          showSuccessToast(message)
        }).catch(()=>{
          showErrorToast()
        })
      }
      else{
        sessionStorage.setItem("err",true)
        this.$router.push("/auth/sign-in")
      }
    },

    PaginationButton (page) {
			return {
				page,
				isActive: this.currentPage === page,
				handleClick: async () => {
					console.log("page: "+page)
					await this.loadProducts(page);

				},
			};
		},
    SetupPagination (totalPage) {
			this.paginationButtons = [];

			let page_count = totalPage;
			for (let i = 1; i < page_count + 1; i++) {
				this.paginationButtons.push(i);
			}
		},
    async loadProducts(page) {
      try{
        const res = await productApi.getFilterProduct(
          this.formFilterProduct.sort,
          this.formFilterProduct.cateogryName,
          this.formFilterProduct.brandName,
          this.formFilterProduct.minPrice,this.formFilterProduct.maxPrice,page)

          this.listProduct = res.data.listProduct
          this.brand = res.data.brand
          this.category = res.data.category
          this.totalPages = res.data.totalPages
          this.currentPage = res.data.currentPage
      }
      catch(err) {console.log("loi store pagination !!!!")}
		},
    initPrice(){
      let timeout = null;
      const delay = 500;
      $("#price-range-slider").slider({
        range: true,
        min: 0,
        max: 30000000,
        values: [this.formFilterProduct.minPrice, this.formFilterProduct.maxPrice],
        slide: (event, ui) => {
          this.formFilterProduct.minPrice = ui.values[0];
          this.formFilterProduct.maxPrice = ui.values[1];
          clearTimeout(timeout); // Xóa timeout hiện tại (nếu có)
          timeout = setTimeout(() => {
            this.currentPage=1
            this.getFilterProduct();
          }, delay);
        }
      });
    },
  },
   mounted() {
     this.getFilterProduct();
     this.initPrice();
     if (sessionStorage.getItem("cart-empty")==1)
     {
        let mess = 'Giỏ hàng không có sản phẩm !!'
        showErrorToastMess(mess)
        sessionStorage.removeItem("cart-empty")
     }
  },
};
</script>
  
<style>
.pi-pic {
  position: relative;
  overflow: hidden;
}

.pi-pic img {
  transition: transform 0.3s ease;
}

.pi-pic:hover img {
  transform: scale(1.2);
}

#price-range-container {
  width: 80%;
  /* margin: 50px auto; */
  margin-left: 20px;
}

#price-range-slider {
  width: 100%;
  padding-bottom: 5px;
}

#price-values {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

</style>