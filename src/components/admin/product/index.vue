<template>
  <div>
    <head><title>Quản lý sản phẩm</title></head>

    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Quản lý sản phẩm</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Quản lý</a></li>
							<li class="breadcrumb-item active">Sản phẩm</li>
						</ol>
					</div>
				</div>
			</div>
		</section>

        <section class="search">
		<div class="container">
			<form @submit.prevent="search(1,formSearchProduct)">
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

<section class="content">
	<div id="toast">
    		</div>
			<!-- Default box -->
			<div class="card">
				<div class="card-header ">
					<h3 class="card-title mt-1">Danh sách sản phẩm</h3>
					<div class="card-tools mr-1">
						<a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary"><span style="font-size: 18px;">+</span> Thêm mới</a>
					</div>
				</div>
				<div class="card-body">
					<table class="text-center product-table">
						<thead>
							<tr>
								<th>STT</th>
								<th>Img</th>
								<th>Tên sản phẩm</th>
								<th>Danh mục</th>
								<th>Thương hiệu</th>
								<th>Giá</th>
								<th>Số lượng</th>
								<th>Discount</th>
								<th>Mô tả</th>
								<th>Thao tác</th>
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
											<a v-if="item.state == `ACTIVED`" @click="stateProduct(item.id,1)" class="btn btn-sm btn-confirmed mr-2"><i class="fa-solid fa-eye"></i></a>
											<a v-else @click="stateProduct(item.id,0)" class="btn btn-sm btn-secondary mr-2"><i class="fa-solid fa-eye-slash"></i></a>
											<a data-bs-toggle="modal" :data-bs-target="`#edit`+item.id"  class="btn btn-sm btn-primary mr-2"><i class="fa-solid fa-pen-to-square"></i></a> 
											<a data-bs-toggle="modal" :data-bs-target="'#delete'+ item.id" class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></a>
										</td>
										<div class="modal delete-new" :id="'delete'+item.id">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Xóa sản phẩm</h4>
														<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
													</div>
													<div class="modal-body">
														Bạn có chắc là xóa không ?
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
														<button @click="clickDeleteProduct(item.id)" class="btn btn-primary">Xác nhận</button>
													</div>
												</div>
											</div>
										</div>
									</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="4">Không có bản ghi nào!!!</td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
				<div class="pagination" id="pagination" v-if="paginationButtons.length >= 2">
					<button v-for="page in paginationButtons" :key="page" 
					:class="{ active: currentPage === page }" 
					@click="PaginationButton(page).handleClick()">
						{{ page }}
					</button>
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
import Add from './add-modal.vue'
import Edit from './edit-modal.vue'
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import productApi from "../../../service/Product";
export default {
    components: {
        Add,
        Edit
    },
    data(){
        return {
			product: [],
			currentPage:'',
			totalPage:'',
			formSearchProduct: [],
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
				bootstrap.Modal.getInstance(document.getElementById('delete' + id)).hide()
				const res = await productApi.deleteProduct(id)
				// this.getListProduct(this.currentPage,this.searchdata)
				if(res.success){
					await this.getListProduct(this.currentPage,this.searchdata)
					let mess='Xóa thành công'
					this.showToastr(true,mess)
				}
				if(res.error){
					let mess='Có lỗi xảy ra'
					this.showToastr(false,mess)
				}
			}
			catch(err){
				console.log("err: "+err)
			}
		},
		async getListProduct(currentPage, formSearchProduct){
			try{
				const res = await productApi.getListProduct(currentPage,formSearchProduct)

				this.product = res.data.listProduct.content
				this.currentPage = res.data.currentPage
				this.totalPage = res.data.listProduct.totalPages
				this.setupPagination(this.totalPage)
			}
			catch(err){
				console.log("Err: "+err)
			}
		},

		search(currentPage,formSearchProduct){
			this.getListProduct(currentPage, formSearchProduct)
		},
		async stateProduct(id,state){
			try{
				const res = await productApi.stateProduct(id,state)

				if(state){
					let mess='Đóng thành công'
					this.showToastr(1,mess)
				}
				if(!state)
				{
					let mess='Mở thành công'
					this.showToastr(1,mess)
				}
				await this.getListProduct(this.currentPage, this.searchdata)
			}
			catch(err){
				console.log("Err: "+err)
			}
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
			this.getListProduct(this.currentPage,this.formSearchProduct)
	}
}
</script>

<style>

</style>