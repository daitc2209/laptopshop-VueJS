<template>
  <div>
    <head>
        <title>Profile Page</title>
    </head>
    <div class="breadcrumbs d-flex flex-row align-items-center col-12 container mt-3">
		<div id="toast">
    	</div>
			<ul>
				<li><a href="/home">Home</a></li>
				<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Profile</a></li>
			</ul>
		</div>
		<section class="container mb-4">
			<div class="row">
				<div class="col-md-4 col-12 p-0" id="side1">
					<span v-if="this.url==null || this.url == ''">
						<img class="image" alt="logo"
							:src="`/src/images/user/`+this.profile.img" />
					</span>
					<span v-else>
						<img id="image" :src="this.url" />
					</span>
					
				</div>
				<div class="col-md-8 col-12 p-0" id="side2">
					<form class="form-login" action="">
						<div class="inp">
							<h3>Profile</h3>
							<input type="text" v-model="profile.fullname" disabled="disabled" title="Họ và tên">
							<input type="email" v-model="profile.email" disabled="disabled" title="Email">  
							<input type="text" v-model="profile.sex" disabled="disabled" title="Giới tính">
							<input type="text" v-model="profile.birthday" disabled="disabled" title="Ngày sinh">
							<input type="text" v-model="profile.address" disabled="disabled" title="Địa chỉ">
						</div>
						<div id="login">
							<button type="button" data-bs-toggle="modal" data-bs-target="#myModal">Click Edit</button>
							<button type="button" data-bs-toggle="modal" data-bs-target="#myModal1">Click Change Password</button>
						</div>
					</form>
				</div>
			</div>
		</section>
		<div class="modal" id="myModal">
		  <div class="modal-dialog">
		    <div class="modal-content">
		
		      <!-- Modal Header -->
		      <div class="modal-header">
		        <h4 class="modal-title">Edit Profile</h4>
		        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
		      </div>
		
		      <!-- Modal body -->
		      <div class="modal-body">
		        	<section class="container">
					<div class="row">
						<div class="col-md-4 col-12 p-0" id="side1" @dragover.prevent="onDragover" @dragleave.prevent="onDragleave" @drop.prevent="onDrop">
							<!-- <img id="image" alt="" :src="'/images/user/' + profile.img" /> -->
							<span v-if="!isDragging">
								<span v-if="this.url==null || this.url == ''">
									<img id="image" alt="" :src="`/src/images/user/`+this.profile.img" />
								</span>
								<span v-else>
									<img id="image" alt="" :src="this.url" />
								</span>
							</span>
						</div>
						<div class="col-md-8 col-12 p-0" id="side2">
							<form 
								class="form-login" 
								@submit.prevent="editProfile()" 
								enctype="multipart/form-data"
							>
								<h3>Edit Profile</h3>
								<div class="inp">
									<input title="ID" type="text" hidden="" v-model="profile.id"> 
									<input title="Họ và tên" type="text" v-model="profile.fullname">
									<select title="Giới tính" class="form-control form-select" v-model="profile.sex">
										<option value="MALE">MALE</option>
										<option value="FEMALE">FEMALE</option>
									</select>
									<input title="Ngày sinh" type="text" v-model="profile.birthday"> 
									<input title="Địa chỉ" type="text" v-model="profile.address"> 
									<input hidden="" type="text" v-model="profile.img" > 
									<input 
										class="p-0" 
										@change="chooseFile" 
										type="file" 
										name="fileImage" 
										ref="file"
										accept=".png, .jpg, jpeg"
										:maxFileSize="1000000"
									/>
								</div>
								<div id="login">
									<button type="submit">Edit</button>
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

		<div class="modal" id="myModal1">
		  <div class="modal-dialog">
		    <div class="modal-content">
		
		      <!-- Modal Header -->
		      <div class="modal-header">
		        <h4 class="modal-title">Change Password</h4>
		        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
		      </div>
		
		      <!-- Modal body -->
		      <div class="modal-body">
		        	<section class="container">
					<div class="row">
						<div class="col-md-12 col-12 p-0" id="side2">
							<form 
								class="form-login" 
								@submit.prevent="ChangePassword()" 
							>
								<h3>Change Password</h3>
								<div class="inp">
									<input title="Old Password" type="text" v-model="oldPw">
									<input title="New Password" type="text" v-model="newPw">  
								</div>
								<div id="login">
									<button type="submit">Save</button>
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
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import User from '../../../service/User';
export default {
    data(){
        return {
            profile: {
				id:'',
				fullname:'',
				address:'',
				sex:'',
				birthday:'',
				email:'',
				img:''
            },
			url:'',
			oldPw:'',
			newPw:''
        }
    },
	methods:{
		chooseFile(e){
			console.log("event: "+e)
			const file = e.target.files[0];
			console.log("file: "+file)
			if (file) {
				this.url = URL.createObjectURL(file);
				this.profile.img = file
				console.log("url: ", this.profile.img);
			}
		
		},
		editProfile() {
			const formData = new FormData();
			// formData.append('fileImage', this.$refs.file.files[0]);
			formData.append('fileImage', this.profile.img);
			formData.append('id', this.profile.id);
			formData.append('fullname', this.profile.fullname);
			formData.append('address', this.profile.address);
			formData.append('sex', this.profile.sex);
			formData.append('birthday', this.profile.birthday);
			formData.append('email', this.profile.email);
			// formData.append('fileImage', this.profile.img);
			
			User.postProfile(formData)
			.then(response => {
				// Xử lý phản hồi thành công
				let message = "Sửa thông tin thành công"
				showSuccessToast(message)
				console.log(response.data);
			})
			.catch(error => {
				// Xử lý lỗi
				console.error("err: "+error);
			});
		},
		getProfile(){
			User.getProfile()
				.then(res => {
					// Xử lý phản hồi thành công
					console.log("get profile");
					if (res.data.data.typeAuth != "DATABASE")
						this.url = res.data.data.profile.img
					this.profile = res.data.data.profile
					console.log(res.data);
				})
				.catch(error => {
					// Xử lý lỗi
					console.error("err: "+error);
				});
		},

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
				this.profile.img = file
				console.log("url: ", this.profile.img);
			}
		},
		ChangePassword(){
			User.postChangePW(this.oldPw,this.newPw)
				.then(res => {
					// Xử lý phản hồi thành công
					console.log("change pw success");
					this.oldPw = ''
					this.newPw = ''
					let message = "Đổi mật khẩu thành công"
					showSuccessToast(message)

				})
				.catch(error => {
					// Xử lý lỗi
					showErrorToast()
					console.error("err: "+error);
				});
		},
		showSuccessToast(message){
      		showSuccessToast(message)
		},
		showErrorToast(){
			showErrorToast()
		}
	},
	mounted(){
		this.getProfile()
	}
}
</script>

<style>

</style>