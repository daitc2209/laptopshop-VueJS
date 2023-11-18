<template>
  <div>
    <head><title>Band Page</title></head>
    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Manage brand</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
							<li class="breadcrumb-item active">Brand</li>
						</ol>
					</div>
				</div>
			</div>
		</section>
		
		<section class="search">
			<div id="toast">
    		</div>
			<div class="container">
				<form @submit.prevent="search(name)">
					<h5 class="px-3 mb-4">Form search brand</h5>
					<div class="row">
						<div class="col-6 left pl-4">
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Name:</label>
								<input type="text" name="name" v-model="name" class="form-control">
							</div>
						</div>
						<div class="col-6 right pl-4">
							<button class="btn btn-primary px-4" type="submit">Search</button>
						</div>
					</div>
				</form>
			</div>
		</section>

		<section class="content">

			<!-- Default box -->
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">List of brand</h3>
					<div class="card-tools">
						<a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary">Add new</a>
					</div>
				</div>
				<div class="card-body">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th>STT</th>
								<th>Tên thương hiệu</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="brand" >
									<tr v-for="(item,index) in brand" :key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
										<td class="td2">{{item.name}}</td>
										<td class="td3">
											<a @click="getEditBrand(item.id)" data-bs-toggle="modal" :data-bs-target="'#edit'+item.id" class="btn btn-sm btn-primary">Edit</a> 
											<a @click="clickDeleteBrand(item.id)" class="btn btn-sm btn-danger">Delete</a>
										</td>
										<div class="modal" :id="'edit'+ item.id">
											<div class="modal-dialog">
												<div class="modal-content">
													<form @submit.prevent="clickEditBrand(brandDto)">
														<div class="modal-header">
															<h4 class="modal-title">Edit brand</h4>
															<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
														</div>
														<div class="modal-body">
															<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
																<div class="form-group">
																	<label for="">Id</label> 
																	<input type="text" name="id" v-model="brandDto.id" class="form-control" readonly="readonly" />
																	<div class="text-danger"></div>
																</div>
																<div class="form-group">
																	<label for="">Name</label> 
																	<input type="text" name="name" v-model="brandDto.name" class="form-control" required="required" />
																	<div class="text-danger"></div>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
															<button type="submit" class="btn btn-primary">Edit</button>
														</div>
													</form>
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

		<div class="modal" id="add">
			<div class="modal-dialog">
				<div class="modal-content">
					<form @submit.prevent="addBrand(brandDto)">
						<div class="modal-header">
							<h4 class="modal-title">Add new brand</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
								<div class="form-group">
									<label for="">Name</label> 
									<input type="text" v-model="brandDto.name" name="name" class="form-control" placeholder="brand name" required="required" />
									<div class="text-danger"></div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" class="btn btn-primary">Add</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import brandsApi from "../../../service/Brands";
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
export default {
    data(){
        return {
            brand: [],
			brandDto:{},
			currentPage:'',
            totalPage: '',
            paginationButtons:[],
        }
    },
    methods: {
		async getListBrand(currentPage, search){
            try{
                const res = await brandsApi.getListBrands(this.currentPage,this.name)
                this.brand = res.data.listBrands.content
                this.currentPage = res.data.currentPage
                this.totalPage = res.data.listBrands.totalPages
                this.setupPagination(this.totalPage)
            }
            catch(err){
                console.log("err: "+err)
            }
        },
        async search(name){
            console.log("name: "+name)
            await this.getListBrand(this.currentPage, name)
        },
        async addBrand(brandDto){
            try{
                const res = await brandsApi.postAddBrands(brandDto)
                    if(res.success){
                        await this.getListBrand(this.currentPage,"")
                        let mess='Thêm thành công'
				        this.showToastr(1,mess)
                        bootstrap.Modal.getInstance(document.getElementById("add")).hide()
                    }
                    if(res.err){
                        let mess='Thêm thất bại'
				        this.showToastr(0,mess)
                    }
            }
            catch(err){
                console.log("err: "+err)
            }
        },
        async getEditBrand(id){
            try{
                const res = await brandsApi.getEditBrands(id)
                this.brandDto = res.data.brandDto
            }
            catch(err){
                console.log("err: "+err)
            }
        },
        async clickEditBrand(brandDto){
            try{
                const res = await brandsApi.postEditBrands(brandDto)
                    if(res.success){
                        await this.getListBrand(this.currentPage,"")
                        let mess='Sửa thành công'
				        this.showToastr(1,mess)
                        bootstrap.Modal.getInstance(document.getElementById("edit"+brandDto.id)).hide()
                    }
                    if(res.err){
                        let mess='Sửa thất bại'
				        this.showToastr(0,mess)
                    }
            }
            catch(err){
                console.log("err: "+err)
            }
        },
        async clickDeleteBrand(id){
            try{
                const res = await brandsApi.deleteBrands(id)
                    if(res.success){
                        await this.getListBrand(this.currentPage,"")
                        let mess='Xóa thành công'
				        this.showToastr(1,mess)
                    }
                    if(res.err){
                        let mess='Xóa thất bại'
				        this.showToastr(0,mess)
                    }
            }
            catch(err){
                console.log("err: "+err)
            }
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
					await this.loadbrand(page);
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
		async loadbrand(page) {
            try{
                const res = await brandsApi.getListBrands(page,this.name)
                this.brand = res.data.listBrands.content
                this.currentPage = res.data.currentPage
                this.totalPage = res.data.listBrands.totalPages
            }
            catch(err){
                console.log("err: "+err)
            }
    	},
    },
	mounted() {
		if(!sessionStorage.getItem("login") && sessionStorage.getItem("role")!="ROLE_ADMIN")
		{
			// window.location.href = "/auth/sign-in"
			this.$router.push("/auth/sign-in")
			sessionStorage.setItem("auth",true)
		}
		else
			this.getListBrand()
 	},
}
</script>

<style>

</style>