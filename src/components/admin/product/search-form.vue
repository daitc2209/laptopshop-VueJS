<template>
  <div>
    <section class="search">
		<div class="container">
			<form @submit.prevent="search">
				<div class="row">
					<div class="col-6 left px-4">
						<div class="form-group d-flex justify-content-between">
							<label for="" class="col-form-label">Tên:</label> 
							<input type="text" v-model="formSearchProduct.name" class="form-control">
						</div>
						<div class="form-group d-flex justify-content-between">
							<label for="" class="col-form-label">Giá:</label> 
							<input type="number" v-model="formSearchProduct.price" class="form-control">
						</div>
						<div class="form-group d-flex justify-content-between">
							<label for="" class="col-form-label">Danh mục:</label> 
							<select class="form-control form-select" v-model="formSearchProduct.categoryName">
								<option selected="selected" value=""></option>
									<option v-for="item in this.categories" :key="item.id" :value="item.id">{{item.name}}</option>
							</select>
						</div>
					</div>
					<div class="col-6 right px-4">
						<div class="form-group d-flex justify-content-between">
							<label for="inputPassword6" class="col-form-label">Số lượng:</label>
							<input type="number" v-model="formSearchProduct.quantity" class="form-control">
						</div>
						<div class="form-group d-flex justify-content-between">
							<label for="inputPassword6" class="col-form-label">Discount:</label>
							<input type="number" v-model="formSearchProduct.discount" class="form-control">
						</div>
						<div class="form-group d-flex justify-content-between">
							<label for="" class="col-form-label">Thương hiệu:</label> 
							<select class="form-control form-select" v-model="formSearchProduct.brandName">
								<option selected="selected" value=""></option>
									<option v-for="item in this.brands" :key="item.id" :value="item.id">{{item.name}}</option>
							</select>
						</div>
					</div>
					<div class="d-flex justify-content-center pr-4 mb-3">
						<button class="btn btn-primary px-4">Tìm kiếm</button>
					</div>
				</div>
			</form>
		</div>
	</section>
  </div>
</template>

<script>
import brandsApi from "../../../service/Brands";
import categoriesApi from "../../../service/Categories";

export default {
    data(){
        return{
            formSearchProduct: [],
			brands:[],
			categories:[]
        }
    },
	methods: {
		search() {
			// Gửi sự kiện 'search-products' kèm dữ liệu tìm kiếm về thành phần cha
			this.$emit('search-products', this.formSearchProduct);
		},
		async getBrands(){
			try {
				const res = await brandsApi.getAllBrands()
				this.brands = res.data.brands
			}
			catch(err){
				console.log(err)
			}
		},

		async getCategories(){
			try {
				const res = await categoriesApi.getAllCategories()
				this.categories = res.data.categories
			}
			catch(err){
				console.log(err)
			}
		}
  	},
	mounted(){
		this.getBrands()
		this.getCategories()
	}
}
</script>
