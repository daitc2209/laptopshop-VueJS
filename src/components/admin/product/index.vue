<template>
  <div>
    <head><title>Product Page</title></head>

    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Manage product</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
							<li class="breadcrumb-item active">Product</li>
						</ol>
					</div>
				</div>
			</div>
		</section>

        <Search @search-products="search"/>

<section class="content">
	<div id="toast">
    		</div>
			<!-- Default box -->
			<div class="card">
				<div class="card-header ">
					<h3 class="card-title mt-1">List of product</h3>
					<div class="card-tools mr-1">
						<a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary">Add new</a>
					</div>
				</div>
				<div class="card-body">
					<table class="text-center product-table">
						<thead>
							<tr>
								<th>STT</th>
								<th>Img</th>
								<th>Name</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Discount</th>
								<th>Description</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="product">
									<tr :id="'trow_'+item.id" v-for="(item,index) in product" :key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 5)">{{ index+1 }}</td>
										<td class="td2"><img :src='`/src/images/product/${item.img}`' alt=""></td>
										<td class="td3"><h6>{{item.name}}</h6></td>
										<td class="td4"><h6>{{item.categoryName}}</h6></td>
										<td class="td5"><h6>{{item.brandName}}</h6></td>
										<td class="td6"><h6>{{formatCurrency(item.price)}}</h6></td>
										<td class="td7"><h6>{{item.quantity}}</h6></td>
										<td class="td8"><h6>{{item.discount}}%</h6></td>
										<td class="td9"><h6>{{item.description}}</h6></td>
										<td class="td10">
											<a data-bs-toggle="modal" :data-bs-target="`#edit`+item.id"  class="btn btn-sm btn-primary">Edit</a> 
											<a @click="clickDeleteProduct(item.id)" class="btn btn-sm btn-danger">Delete</a>
										</td>
									</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="4">Không có bản ghi nào!!!</td>
								</tr>
							</template>
						</tbody>
					</table>
					<div class="pagination" id="pagination" v-if="paginationButtons.length >= 2">
						<button v-for="page in paginationButtons" :key="page" 
						:class="{ active: currentPage === page }" 
						@click="PaginationButton(page).handleClick()">
							{{ page }}
						</button>
					</div>
				</div>
			</div>
		</section>

        <Add @add="handleEvent"/>

        <div v-for="p in product" :key="p.id">
			<Edit @edit="handleEvent" :productId="p.id" />
		</div>

  </div>

</template>

<script>
import Search from './search-form.vue'
import Add from './add-modal.vue'
import Edit from './edit-modal.vue'
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import productApi from "../../../service/Product";
export default {
    components: {
        Search,
        Add,
        Edit
    },
    data(){
        return {
			product: [],
			currentPage:'',
			totalPage:'',
			searchdata:{},
			paginationButtons:[]
        }
    },
    methods: {
        formatCurrency(value) {
			const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(value);
		},
        async clickDeleteProduct(id){
			try{
				const res = productApi.deleteProduct(id)
				this.getListProduct(this.currentPage,this.searchdata)
				if(res.success){
					let mess='Xóa thành công'
					this.showToastr(true,mess)
				}
				if(res.error){
					let mess='Có lỗi xảy ra'
					this.showToastr(false,mess)
				}

			}
			catch(err){
				let mess='Có lỗi xảy ra'
				this.showToastr(false,mess)
			}
		},
		async getListProduct(currentPage, searchdata){
			try{
				const res = await productApi.getListProduct(currentPage,searchdata)

				this.product = res.data.listProduct.content
				this.currentPage = res.data.currentPage
				this.totalPage = res.data.listProduct.totalPages
				this.setupPagination(this.totalPage)
			}
			catch(err){
				console.log("Err: "+err)
			}
		},

		search(currentPage,searchData){
			this.searchdata = searchData
			this.getListProduct(currentPage, this.searchdata)
		},

		async handleEvent(){
				await this.getListProduct(this.currentPage, this.searchdata = {})
		},

		showToastr(condition,message) {
            if(condition)
				showSuccessToast(message)
			
			if(condition == false)
				showErrorToast(message)
			
        },
        PaginationButton (page) {
			return {
				page,
				isActive: this.currentPage === page,
				handleClick: async () => {
					console.log("page: "+page)
					await this.loadProduct(page);
				},
			};
		},
    	setupPagination (totalPage) {
			this.paginationButtons = [];

			let page_count = totalPage;
			for (let i = 1; i < page_count + 1; i++) {
				this.paginationButtons.push(i);
			}
		},
		async loadProduct(page) {
			try{
				const res = await productApi.getListProduct(page,this.searchdata)
				this.product = res.data.listProduct.content
				this.currentPage = res.data.currentPage
				this.totalPage = res.data.listProduct.totalPages
			}
			catch(err){
				console.log(err)
			}
    	},
    },
	mounted(){
		if(!sessionStorage.getItem("login") && sessionStorage.getItem("role")!="ROLE_ADMIN")
		{
			// window.location.href = "/auth/sign-in"
			this.$router.push("/auth/sign-in")
			sessionStorage.setItem("auth",true)
		}
		else
			this.getListProduct(this.currentPage,this.searchdata)
	}
}
</script>

<style>

</style>