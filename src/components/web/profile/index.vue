<template>
  <div class="container">
    <head>
        <title>Thông tin tài khoản</title>
    </head>
	<div v-if="showPreload" class="preload-screen">
		<div class="preloader-wrapper d-flex">
			<div class="spinner-border text-primary">
				<span class="visually-hidden">Loading...</span>
			</div>
			<span style="margin-left: 20px; line-height: 30px;">Hệ thống đang xử lý</span>
		</div>
	</div>
    <div class="breadcrumbs d-flex flex-row align-items-center col-12 container mt-3">
		<div id="toast">
    	</div>
			<ul>
				<li><a href="/home">Trang chủ</a></li>
				<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Thông tin tài khoản</a></li>
			</ul>
		</div>
		<section class="profile mb-4">
			<div class="col-3"><menuShared/></div>
			<div class="col-9">
				<div class="row">
					<div class="profile-container col-md-8 col-12 p-0" >
						<div class="profile-container__img">
							<div class="profile-img">
								<img class="profile-img__link" :src="this.profile.img" />
							</div>
						</div>
						<div class="profile-form" >
							<div class="inp">
								<!-- <h3>Profile</h3> -->
								<div class="profile-form__feild"><label class="profile-form__name" for="">Họ và tên</label> <input class="profile-form__feild-item" type="text" v-model="profile.fullname" disabled="disabled" title="Tên"></div>
								<div class="profile-form__feild"><label class="profile-form__name" for="">Email</label> <input class="profile-form__feild-item" type="email" v-model="profile.email" disabled="disabled" title="Email"></div>
								<div class="profile-form__feild"><label class="profile-form__name" for="">Giới Tính</label> <input class="profile-form__feild-item" type="text"  disabled="disabled" title="Giới tính" :value="getGenderDisplay(profile.sex)"></div>
								<div class="profile-form__feild"><label class="profile-form__name" for="">Ngày sinh</label> <input class="profile-form__feild-item" type="text" v-model="profile.birthday" disabled="disabled" title="Ngày sinh"> </div>
								<div class="profile-form__feild"><label class="profile-form__name" for="">Địa chỉ</label> <input class="profile-form__feild-item" type="text" v-model="profile.address" disabled="disabled" title="Địa chỉ"></div>
								<div class="profile-form__feild"><label class="profile-form__name" for="">SĐT</label> <input class="profile-form__feild-item" type="text" v-model="profile.phone" disabled="disabled" title="SDT"></div>
								
							</div>
							<div id="login">
								<button type="button" @click="getProfile()" data-bs-toggle="modal" data-bs-target="#myModal">Cập nhật thông tin</button>
								<button v-if="auth" type="button" data-bs-toggle="modal" data-bs-target="#myModal1">Đổi mật khẩu</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="modal" id="myModal">
		  <div class="modal-dialog">
		    <div class="modal-content">
		
		      <!-- Modal Header -->
		      <div class="modal-header">
		        <h4 class="modal-title">Cập nhật thông tin</h4>
		        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
		      </div>
		
		      <!-- Modal body -->
		      <div class="modal-body">
		        	<section class="container">
					<div class="row">
						<div class="col-md-4 col-12 p-0" id="side1" @dragover.prevent="onDragover" @dragleave.prevent="onDragleave" @drop.prevent="onDrop">
							<template v-if="!isDragging">
								<span v-if="this.url==null || this.url == ''">
									<img id="image" alt="" :src="this.profile.img" />
								</span>
								<span v-else>
									<img id="image" alt="" :src="this.url" />
								</span>
							</template>
						</div>
						<div class="col-md-8 col-12 p-0" id="side2">
							<form 
								class="profile-form " 
								@submit.prevent="editProfile()" 
								enctype="multipart/form-data"
							>
								<h3>Edit Profile</h3>
								<div class="inp">
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">Họ và tên</label>
										<input class="profile-form__feild-item" title="Họ và tên" type="text" v-model="profile.fullname"> 
									</div> 
									<div class="profile-form__feild" v-if="auth">
										<label class="profile-form__name" for="">Email</label>
										<input class="profile-form__feild-item" title="Email" type="text" v-model="profile.email" pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$">
									</div>
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">Giới tính</label>
										<select  title="Giới tính" class="profile-form__feild-item"  v-model="profile.sex">
											<option value="MALE">Nam</option>
											<option value="FEMALE">Nữ</option>
										</select>
									</div>
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">Ngày sinh</label>
										<input class="profile-form__feild-item" title="Định dạng: yyyy-mm-dd" type="text" v-model="profile.birthday" placeholder="yyyy-mm-dd" pattern="^\d{4}-\d{2}-\d{2}$">
									</div>
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">SĐT</label>
										<input class="profile-form__feild-item" title="VD: 0123456789" type="text" v-model="profile.phone" >
									</div>
									<input hidden="" type="text" v-model="profile.img" > 
									<div class="profile-form__feild">
										<label class="profile-form__name" for=""></label>
										<input 
											class="p-0 profile-form__feild-item" 
											@change="chooseFile" 
											type="file" 
											name="fileImage" 
											ref="file"
											accept=".png, .jpg, jpeg"
											:maxFileSize="1000000"
										/>
									</div>
								</div>
								<div id="login">
									<button type="submit">Cập nhật</button>
								</div>
							</form>
						</div>
					</div>
				</section>
		      </div>
			  
		      <!-- Modal footer -->
		      <div class="modal-footer">
		        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
		      </div>
		    </div>
		  </div>
		</div>

		<div class="modal" id="myModal1">
		  <div class="modal-dialog">
		    <div class="modal-content changePW-container">
		
		      <!-- Modal Header -->
		      <div class="modal-header">
		        <h4 class="modal-title">Đổi mật khẩu</h4>
		        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
		      </div>
		
		      <!-- Modal body -->
		      <div class="modal-body">
		        	<section class="container">
					<div class="row">
						<div class="col-md-12 col-12 p-0" id="side2">
							<form 
								class="profile-form" 
								@submit.prevent="ChangePassword()" 
							>
								<h3>Đổi mật khẩu</h3>
								<div v-if="error">
									<div class="alert alert-danger">{{ error }}</div>
								</div>
								<div class="inp">
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">Mật khẩu hiện tại <span style="color: red;">*</span></label>
										<input class="profile-form__feild-item" title="Old Password" required type="text" v-model="oldPw">
									</div>
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">Mật khẩu mới<span style="color: red;">*</span></label>
										<input @input="clearPasswordMismatchError()" class="profile-form__feild-item" required type="text" v-model="newPw" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,})$" title="Ít nhất 8 ký tự trở lên. Có ít nhất một chữ số. Có ít nhất một chữ cái viết thường. Có ít nhất một chữ cái viết hoa.">
									</div>
									<div class="profile-form__feild">
										<label class="profile-form__name" for="">Nhập lại mật khẩu <span style="color: red;">*</span></label>
										<input @input="clearPasswordMismatchError()" class="profile-form__feild-item" required type="text" v-model="confirm_newPw" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,})$" title="Ít nhất 8 ký tự trở lên. Có ít nhất một chữ số. Có ít nhất một chữ cái viết thường. Có ít nhất một chữ cái viết hoa.">
									</div>
								</div>
								<div id="login">
									<button type="submit">Xác nhận</button>
								</div>
							</form>
						</div>
					</div>
				</section>
		      </div>
		      <!-- Modal footer -->
		      <div class="modal-footer">
		        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
  </div>
</template>

<script>
import { showSuccessToast, showErrorToast,getGenderDisplay, showErrorToastMess } from "../../../assets/web/js/main";
import userApi from '../../../service/User';
import menuShared from "./menu-shared.vue";
export default {
	components: {
        menuShared
    },
    data(){
        return {
            profile: {
				id:'',
				fullname:'',
				address:'',
				sex:'',
				birthday:'',
				email:'',
				img:'',
				phone:''
            },
			oldPw:'',
			newPw:'',
			confirm_newPw:'',
			url:'',
			imgDto:'',
			showPreload: false,
			error:"",
			auth: sessionStorage.getItem("auth")
        }
    },
	methods:{
		chooseFile(e){
			const file = e.target.files[0];
			if (file) {
				this.url = URL.createObjectURL(file);
				this.imgDto = file
			}
		},
		async editProfile() {
			try{
				this.showPreload = true
				const formData = new FormData();
				if (this.imgDto !== null && this.imgDto !== "")
					this.profile.img = this.imgDto

				formData.append('fileImage', this.profile.img);
				formData.append('id', this.profile.id);
				formData.append('fullname', this.profile.fullname);
				formData.append('address', this.profile.address);
				formData.append('sex', this.profile.sex);
				formData.append('birthday', this.profile.birthday);
				formData.append('email', this.profile.email);
				formData.append('phone', this.profile.phone);
				
				const res = await userApi.postProfile(formData)
				this.getProfile()
				if(res.success)
				{
					showSuccessToast("Sửa thông tin thành công")
				}
				if(res.error)
					showErrorToastMess("Email đã được liên kết với tài khoản khác.")
				
				this.showPreload = false
				bootstrap.Modal.getInstance(document.getElementById("myModal")).hide()
			}catch(err){
				this.showPreload = false
				console.error("err: "+error);
			}
		},
		async getProfile(){
			try{
				this.url = ''
				const res = await userApi.getProfile()
				this.profile = res.data.profile
				sessionStorage.setItem("img",this.profile.img)
			}catch(error) {
				console.error("err: "+error);
			};
		},
		getGenderDisplay,
		onDragover(e){
			e.preventDefault();
			this.isDragging = true;
			e.dataTransfer.dropEffect = "copy"
		},
		onDragleave(e){
			e.preventDefault();
			this.isDragging = false;
		},
		onDrop(e){
			e.preventDefault();
			this.isDragging = false;
			const file = e.dataTransfer.files[0];
			console.log("file new: "+file)
			if (file) {
				this.url = URL.createObjectURL(file);
				this.imgDto = file
				console.log("url: ", this.imgDto);
			}
		},
		clearPasswordMismatchError() {
			this.error = '';
		},
		async ChangePassword(){
			try{
				if (this.newPw !== this.confirm_newPw) {
					this.error = 'Mật khẩu mới không trùng nhau';
					return; 
				}
				await userApi.postChangePW(this.oldPw,this.newPw)
			
				this.oldPw = ''
				this.newPw = ''
				this.confirm_newPw = ''
				showSuccessToast('Đổi mật khẩu thành công')
				bootstrap.Modal.getInstance(document.getElementById("myModal1")).hide()
					
			}catch(err){
				showErrorToast()
				console.error("err: "+error);
			}
		},
	},
	mounted(){
		if(sessionStorage.getItem("login"))
			this.getProfile()
		else
		{
			window.location.href = "/auth/sign-in"
			sessionStorage.setItem("err",true)
		}
	}
}
</script>

<style>
@import url("../../../assets/web/css/profile.css");
</style>