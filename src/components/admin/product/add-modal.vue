<template>
  <div>
	<div id="toast">
    		</div>
    <div class="modal" id="add">
		<div class="modal-dialog">
			<div class="modal-content">
				<form @submit.prevent="addProduct(productDto)" enctype="multipart/form-data">
					<div class="modal-header">
						<h4 class="modal-title">Thêm sản phẩm</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<div id="logins-part" class="content" role="tabpanel"
							aria-labelledby="logins-part-trigger">
							<div class="form-group">
								<label for="">Tên sản phẩm</label> 
								<input type="text" v-model="productDto.name" class="form-control" required="required" />
								
							</div>
							<div class="form-group">
								<label for="">Danh mục</label> 
								<select v-model="productDto.categoryName" class="form-control form-select" required="required">
									
									<option v-for="item in categories" :key="item.id" :value="item.name">{{item.name}}</option>
								</select>
								
							</div>
							<div class="form-group">
								<label for="">Thương hiệu</label> 
								<select v-model="productDto.brandName" class="form-control form-select" required="required">
								
									<option v-for="item in brands" :key="item.id" :value="item.name">{{item.name}}</option>

								</select>
								
							</div>
							<div class="form-group">
								<label for="">Giá</label> 
								<input type="text" v-model="productDto.price" class="form-control" required="required" />
								
							</div>
							<div class="form-group">
								<label for="">Discount</label> 
								<input type="text" v-model="productDto.discount" class="form-control" required="required" />
								
							</div>
							<div class="form-group">
								<label for="">Số lượng</label> 
								<input type="text" v-model="productDto.quantity" class="form-control" required="required" />
								
							</div>
							<div class="form-group">
								<label for="">Mô tả</label>
								<textarea v-model="productDto.description" class="form-control" required="required" rows="4"></textarea>
								<div id="quillEditor"></div>
								<input type="hidden" name="quillContent" id="quillContent">
							</div>
							<div class="form-group">
								<label for="">Trạng thái</label> 
								<select v-model="productDto.state" class="form-control form-select" required="required">
									<option selected value="ACTIVED">Hiển thị</option>
									<option value="DISABLED">Không hiển thị</option>
								</select>
							</div>
							<div class="form-group">
								<label for="">Img</label> 
								<input class="form-control" @change="chooseFile" :value="input" type="file" name="fileImage" />
							</div>
							<div class="form-group d-flex justify-content-center">
								<img id="imageAdd" class="imageAdd" :src="productDto.img" style="height: 200px; width: 200px"/>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
						<button type="submit" class="btn btn-primary">Xác nhận</button>
					</div>
				</form>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import brandsApi from "../../../service/Brands";
import categoriesApi from "../../../service/Categories";
import productApi from '../../../service/Product';
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
export default {
    data(){
        return {
            productDto:[],
			brands:[],
			categories:[],
			imgDto:'',
			input: ''
        }
    },
    methods:{
		async addProduct(productDto){
			try{
				const formData = new FormData();
				if(this.imgDto != "" || this.imgDto != null)
					productDto.img = this.imgDto
				formData.append('fileImage', productDto.img);
				formData.append('name', productDto.name);
				formData.append('categoryName', productDto.categoryName);
				formData.append('brandName', productDto.brandName);
				formData.append('price', productDto.price);
				formData.append('discount', productDto.discount);
				formData.append('quantity', productDto.quantity);
				formData.append('description', productDto.description);
				formData.append('state', productDto.state);
				
				const res = await productApi.addProduct(formData)
				if(res.success){
					this.$emit('add')
					let mess = "Thêm thành công"
					this.showToastr(true,mess)
					this.productDto=[]
					this.imgDto=''
				}
				if(res.error){
					let mess='Có lỗi xảy ra'
					this.showToastr(false,mess)
				}
				bootstrap.Modal.getInstance(document.getElementById("add")).hide()
			
			}
			catch(error){
				console.log("err: "+error)
			};
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
		},
		showToastr(condition,message) {
            if(condition)
				showSuccessToast(message)
			
			if(condition == false)
				showErrorToast(message)
			
        },
		chooseFile(e){
			console.log("event: "+e)
			const file = e.target.files[0];
			console.log("file: "+file)
			if (file) {
				this.imgDto = file;
				this.productDto.img = URL.createObjectURL(file)
				this.productDto.urlImg = true
				this.input = ''
				console.log("file: ", this.imgDto);
				console.log("url: ", this.productDto.img);
			}
		},
    },
	mounted(){
		this.getBrands()
		this.getCategories()
	}
}
</script>

<style>

</style>