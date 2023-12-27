<template>
  <div>
	<div id="toast">
    		</div>
    <div class="modal" :id="`edit`+productId">
		<div class="modal-dialog">
			<div class="modal-content">
				<form 
					id="formEditProduct" 
					@submit.prevent="clickEditProduct(productDto)"
					enctype="multipart/form-data"
				>
					<div class="modal-header">
						<h4 class="modal-title">Chỉnh sửa thông tin sản phẩm</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
							<div class="form-group">
								<label for="">Id</label> 
								<input type="text" id="idEdit" v-model="productDto.id" class="form-control" readonly="readonly" />
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Tên sản phẩm</label> 
								<input type="text" id="nameEdit" v-model="productDto.name" class="form-control" required="required" />
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Danh mục</label> 
								<select v-model="productDto.categoryName" class="form-control form-select" id="categoryEdit" required="required">
									
										<option v-for="item in categories" :key="item.id" :value="item.name">{{item.name}}</option>
								
								</select>
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Thương hiệu</label> 
								<select v-model="productDto.brandName" class="form-control form-select" id="brandEdit" required="required">
									
										<option v-for="item in brands" :key="item.id" :value="item.name">{{item.name}}</option>
									
								</select>
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Giá</label> 
								<input type="text" v-model="productDto.price" class="form-control" id="priceEdit" required="required" />
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Discount</label> 
								<input type="text" v-model="productDto.discount" class="form-control" id="discountEdit" required="required" />
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Số lượng</label> 
								<input type="text" v-model="productDto.quantity" class="form-control" id="quantityEdit" required="required" />
								<div class="text-danger"></div>
							</div>
							<div class="form-group">
								<label for="">Mô tả</label>
								<textarea v-model="productDto.description" class="form-control" required="required" id="descriptionEdit" rows="4"></textarea>
								<div class="text-danger"></div>
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
								<input hidden="" type="text" id="thumbnailEdit" v-model="productDto.img"> 
								<input class="form-control" @change="chooseFile" type="file" name="fileImage" />
							</div>
							<div class="form-group d-flex justify-content-center">
								<img v-if="productDto.urlImg" id="imageAdd" class="imageAdd" :src="productDto.img" style="height: 200px; width: 200px"/>
								<img v-else id="imageAdd" class="imageAdd" :src="`/src/images/product/`+productDto.img" style="height: 200px; width: 200px"/>
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
			imgDto:'',
			brands:[],
			categories:[],
        }
    },
	props:{
		productId:{
			type: Number,
			required: true
		}
	},
    methods:{
		async getEditProduct(){
			try{
				const res = await productApi.getEditProduct(this.productId)
				this.productDto = res
				this.productDto.urlImg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(this.productDto.img);
			}
			catch(err){
				console.log("Err: "+err)
			}
		},
		async clickEditProduct(productDto){
			try{
				const formData = new FormData();
				if(this.imgDto != "" && this.imgDto != null)
					productDto.img = this.imgDto
				formData.append('fileImage', productDto.img);
				formData.append('id', productDto.id);
				formData.append('name', productDto.name);
				formData.append('categoryName', productDto.categoryName);
				formData.append('brandName', productDto.brandName);
				formData.append('price', productDto.price);
				formData.append('discount', productDto.discount);
				formData.append('quantity', productDto.quantity);
				formData.append('description', productDto.description);
				formData.append('state', productDto.state);
				
				const res = await productApi.postEditProduct(formData)
				if(res.success){
					this.$emit('edit')
					let mess = "Sửa thành công"
					this.showToastr(true,mess)
					await this.getEditProduct()
				}
				if(res.error){
					let mess='Có lỗi xảy ra'
					this.showToastr(false,mess)
				}
				bootstrap.Modal.getInstance(document.getElementById("edit"+this.productId)).hide()
			
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
				console.log("file: ", this.imgDto);
				console.log("url: ", this.productDto.img);
			}
		},
    },
	mounted(){
		this.getBrands()
		this.getCategories()
		this.getEditProduct()
	}
}
</script>

<style>

</style>