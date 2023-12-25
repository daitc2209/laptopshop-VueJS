<template>
  <div>
    <head>
        <title>Admin User Page</title>
    </head>
    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Manage user</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
							<li class="breadcrumb-item active">User</li>
						</ol>
					</div>
				</div>
			</div>
		</section>
		
		<section class="search">
			<div id="toast">
    		</div>
			<div class="container">
				<form @submit.prevent="search(1,formSearchUser)">
					<h5 class="px-3 mb-4">Form search user</h5>
					<div class="row">
						<div class="col-6 left px-4">
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Fullname:</label>
								<input type="text" v-model="formSearchUser.fullname" class="form-control" />
							</div>
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Sex:</label>
								<select class="form-control form-select" v-model="formSearchUser.sex">
									<option selected="selected" value=""></option>
									<option value="MALE">MALE</option>
									<option value="FEMALE">FEMALE</option>
								</select>
							</div>
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Address:</label>
								<input type="text" v-model="formSearchUser.address" class="form-control" />
							</div>
						</div>
						<div class="col-6 right px-4">
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Email:</label>
								<input type="text" v-model="formSearchUser.email" class="form-control" />
							</div>
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">State user:</label>
								<select class="form-control form-select" v-model="formSearchUser.stateUser">
									<option selected="selected" value=""></option>
									<option value="PENDING">PENDING</option>
									<option value="ACTIVED">ACTIVED</option>
									<option value="DISABLED">DISABLED</option>
									<option value="REMOVED">REMOVED</option>
								</select>
							</div>
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">AuthType:</label>
								<select class="form-control form-select" v-model="formSearchUser.authType">
									<option selected="selected" value=""></option>
									<option value="DATABASE">DATABASE</option>
									<option value="GOOGLE">GOOGLE</option>
									<option value="FACEBOOK">FACEBOOK</option>
								</select>
							</div>
						</div>
						<div class="d-flex justify-content-center pr-4 mb-3">
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
					<h3 class="card-title">List of user</h3>
					<div class="card-tools">
						<a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary">Add new</a>
					</div>
				</div>
				<div class="card-body">
					<table class="user-table text-center">
						<thead>
							<tr>
								<th>STT</th>
								<th>Img</th>
								<th>Fullname</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Sex</th>
								<th>Birthday</th>
								<th>Address</th>
								<th>State User</th>
								<th>Auth Type</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="user">
									<tr :id="'trow_'+item.id" v-for="(item,index) in user" v-bind:key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
										<td class="td2" v-if="item.urlImg"><img :src='item.img' alt=""></td>
										<td class="td2" v-else><img :src='`/src/images/user/`+item.img' alt=""></td>
										<td class="td3"><h6>{{ item.fullname }}</h6></td>
										<td class="td4"><h6>{{item.email}}</h6></td>
										<td class="td4"><h6>{{item.phone}}</h6></td>
										<td class="td5"><h6>{{item.gender}}</h6></td>
										<td class="td6"><h6>{{item.dob}}</h6></td>
										<td class="td7"><h6>{{item.address}}</h6></td>
										<td class="td8"><h6>{{item.stateUser}}</h6></td>
										<td class="td9"><h6>{{item.authType}}</h6></td>
										<td class="td11">
											<a data-bs-toggle="modal" @click="getEditUser(item.id)" :data-bs-target="`#edit`+item.id" class="btn btn-sm btn-primary">Edit</a> 
											<a v-if="item.lock==true" data-bs-toggle="modal" :data-bs-target="'#lock'+ item.id" class="btn btn-sm btn-danger">Lock</a>
											<a v-else data-bs-toggle="modal" :data-bs-target="'#unlock'+ item.id" class="btn btn-sm btn-danger">Unlock</a>
											<a data-bs-toggle="modal" :data-bs-target="'#delete'+ item.id" class="btn btn-sm btn-danger">Delete</a>
										</td>
										<div class="modal delete-new" :id="'delete'+item.id">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Xóa tài khoản</h4>
														<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
													</div>
													<div class="modal-body">
														Bạn có chắc là xóa không ?
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
														<button @click="clickDeleteUser(item.id)" class="btn btn-primary">Xác nhận</button>
													</div>
												</div>
											</div>
										</div>
										<div class="modal lock-new" :id="'lock'+item.id">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Khóa tài khoản</h4>
														<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
													</div>
													<div class="modal-body">
														Bạn có chắc là khóa tài khoản này không ?
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
														<button @click="clicklockUser(item.id)" class="btn btn-primary">Xác nhận</button>
													</div>
												</div>
											</div>
										</div>
										<div class="modal unlock-new" :id="'unlock'+item.id">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h4 class="modal-title">Mở tài khoản</h4>
														<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
													</div>
													<div class="modal-body">
														Bạn có chắc là mở tài khoản này không ?
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
														<button @click="clickUnlockUser(item.id)" class="btn btn-primary">Xác nhận</button>
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
					<form @submit.prevent="addUser(formAddUser)">
						<div class="modal-header">
							<h4 class="modal-title">Add new user</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
								<div class="form-group">
									<label for="">Fullname</label> 
									<input type="text" v-model="formAddUser.fullname" class="form-control" required="required" />
								</div>
								<div class="form-group">
									<label for="">Email</label> 
									<input type="text" v-model="formAddUser.email" class="form-control" required="required" />
								</div>
								<div class="form-group">
									<label for="">Username</label> 
									<input type="text" v-model="formAddUser.username" class="form-control" required="required" />
								</div>
								<div class="form-group">
									<label for="">Password</label> 
									<input autocomplete="" type="password" v-model="formAddUser.password" class="form-control" required="required" />
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
		<div v-for="item in user" v-bind:key="item.id" >
			<div class="modal" :id="`edit`+item.id">
				<div class="modal-dialog">
					<div class="modal-content">
						<form id="formEditUser" @submit.prevent="editUser(formEditUser)" enctype="multipart/form-data">
							<div class="modal-header">
								<h4 class="modal-title">Edit new user</h4>
								<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
							</div>
							<div class="modal-body">
								<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
									<div class="form-group">
										<label for="">Id</label> 
										<input type="text" id="idEdit" v-model="formEditUser.id" class="form-control" readonly="readonly"/>
									</div>
									<div class="form-group">
										<label for="">Fullname</label> 
										<input type="text" id="fullnameEdit" v-model="formEditUser.fullname" class="form-control" required="required" />
									</div>
									<div class="form-group">
										<label for="">Sex</label> 
										<select class="form-control form-select" id="sexEdit" v-model="formEditUser.gender" >
											<option value="MALE">MALE</option>
											<option value="FEMALE">FEMALE</option>
										</select>
									</div>
									<div class="form-group">
										<label for="">Birthday</label> 
										<input type="text" class="form-control" id="birthdayEdit" v-model="formEditUser.dob" />
									</div>
									<div class="form-group">
										<label for="">Address</label> 
										<input type="text" class="form-control" id="addressEdit" v-model="formEditUser.address" />
									</div>
									<div class="form-group">
										<label for="">Phone</label> 
										<input type="text" class="form-control" id="phoneEdit" v-model="formEditUser.phone" />
									</div>
									<div class="form-group">
										<label for="">State user</label> 
										<select class="form-control form-select" id="stateUserEdit" v-model="formEditUser.stateUser" required="required">
											<option value="PENDING">PENDING</option>
											<option value="ACTIVED">ACTIVED</option>
											<option value="DISABLED">DISABLED</option>
											<option value="REMOVED">REMOVED</option>
										</select>
									</div>
									<div class="form-group">
										<label for="">Img</label> 
										<input hidden="" type="text" v-model="formEditUser.img" id="imgEdit" /> 
										<input class="form-control" @change="chooseFile" type="file" id="fileImage" name="fileImage" 
										ref="file"
										accept=".png, .jpg, jpeg"
										:maxFileSize="1000000" />
									</div>
									<div class="form-group d-flex justify-content-center">
										<img v-if="formEditUser.urlImg" id="imageEdit" class="imgEdit" :src="formEditUser.img" style="height: 200px; width: 200px"/>
										<img v-else id="imageEdit" class="imgEdit" :src="`/src/images/user/`+formEditUser.img" style="height: 200px; width: 200px"/>
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
		</div>
  </div>
</template>

<script>
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import Users from '../../../service/User'
export default {
    data(){
        return {
			user: [],
			currentPage:'',
			totalPage:"",
            formSearchUser: {},
            formAddUser: {role:2},
            formEditUser: {},
			paginationButtons:[],
			imgDto:'',
        }
    },
    methods: {
		getListUserAdmin(){
			Users.getListUserAdmin(this.currentPage,
			 	this.formSearchUser.fullname,
				this.formSearchUser.sex,
				this.formSearchUser.address,
				this.formSearchUser.email,
				this.formSearchUser.stateUser,
				this.formSearchUser.authType)
				.then(res => {
					if(res.data.data.listUser != null){
						this.user = res.data.data.listUser.content.map(user => {return {...user,urlImg: false,lock:false}})
						this.totalPage = res.data.data.listUser.totalPages
						this.currentPage = res.data.data.currentPage
						this.user.forEach(user => {
							if(user.stateUser == "ACTIVED")
								user.lock = true
						});
						this.setupPagination(this.totalPage)
						
						this.user.forEach(user => {
							user.urlImg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(user.img);
						});
					}
					else
						this.user = false
				})
				.catch(err => {
					console.log("err: "+err)
				})
		},
		addUser(formAddUser){
			Users.addUser(formAddUser)
				.then(res=>{
					let mess=''
					if(res.data.success)
					{
						mess='Thêm mới thành công'
						this.showToastr(1,mess)
					}
					if(res.data.error){
						mess='Có lỗi xảy ra'
						this.showToastr(0,mess)
					}
					this.formAddUser={}
					this.getListUserAdmin();
					bootstrap.Modal.getInstance(document.getElementById("add")).hide()
				})
				.catch(err=>{
					console.log("err: "+err)
				})
		},
		getEditUser(id){
			Users.getEditUser(id)
				.then(res=>{
					this.formEditUser = res.data
					this.formEditUser.urlImg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(this.formEditUser.img);
				})
				.catch(err=>{
					console.log("err: "+err)
				})
		},
		editUser(formEditUser){
			const formData = new FormData();
			if(this.imgDto != "" && this.imgDto != null)
				formEditUser.img = this.imgDto
			formData.append('fileImage', formEditUser.img);
			formData.append('id', formEditUser.id);
			formData.append('fullname', formEditUser.fullname);
			formData.append('address', formEditUser.address);
			formData.append('sex', formEditUser.gender);
			formData.append('birthday', formEditUser.dob);
			formData.append('stateUser', formEditUser.stateUser);
			formData.append('phone', formEditUser.phone);

			Users.postEditUser(formData)
				.then(res => {
					this.getListUserAdmin()
					// Xử lý phản hồi thành công
					let mess=''
					if(res.data.success)
					{
						mess='Sửa thành công'
						this.showToastr(1,mess)
					}
					if(res.data.error){
						mess='Có lỗi xảy ra'
						this.showToastr(0,mess)
					}
					bootstrap.Modal.getInstance(document.getElementById("edit"+formEditUser.id)).hide()
				})
				.catch(error => {
					// Xử lý lỗi
					console.error("err: "+error);
				});
		},
        clicklockUser(id){
			Users.lockUser(id)
				.then(res => {
					this.getListUserAdmin()
					if(res.data.success)
					{
						let mess='Khóa thành công'
						this.showToastr(1,mess)
					}
					if(res.data.error){
						let mess='Có lỗi xảy ra'
						this.showToastr(0,mess)
					}
					bootstrap.Modal.getInstance(document.getElementById("lock"+id)).hide()
				})
				.catch(err => {
					console.error("err: "+error);
				})
		},
        clickUnlockUser(id){
			Users.unlockUser(id)
				.then(res => {
					if(res.data.success)
					{
						let mess='Mở khóa thành công'
						this.showToastr(1,mess)
						this.getListUserAdmin()
					}
					if(res.data.error){
						let mess='Có lỗi xảy ra'
						this.showToastr(0,mess)
					}
					bootstrap.Modal.getInstance(document.getElementById("unlock"+id)).hide()
				})
				.catch(err => {
					console.error("err: "+error);
				})
		},
		clickDeleteUser(id){
			Users.deleteUser(id)
				.then(res => {
					if(res.data.success)
					{
						let mess='Xoá thành công'
						this.showToastr(1,mess)
						this.getListUserAdmin()
						bootstrap.Modal.getInstance(document.getElementById("delete" + id)).hide()
					}
					if(res.data.error){
						let mess='Có lỗi xảy ra'
						this.showToastr(0,mess)
					}
				})
				.catch(err => {
					console.error("err: "+error);
				})
		},

		search(page,formSearchUser){
			console.log("formSearchUser: "+formSearchUser.fullname)
			this.getListUserAdmin(page,formSearchUser.fullname,
				formSearchUser.sex,
				formSearchUser.address,
				formSearchUser.email,
				formSearchUser.stateUser,
				formSearchUser.authType)
		},

		chooseFile(e){
			console.log("event: "+e)
			const file = e.target.files[0];
			console.log("file: "+file)
			if (file) {
				this.imgDto = file;
				this.formEditUser.img = URL.createObjectURL(file)
				this.formEditUser.urlImg = true
				console.log("url: ", this.formEditUser.img);
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
					await this.loadUsers(page);
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
		async loadUsers(page) {
				Users.getListUserAdmin(page)
				.then(res => {
					this.user = res.data.data.listUser.content
					this.totalPage = res.data.data.listUser.totalPages
					this.currentPage = res.data.data.currentPage
					this.user.forEach(user => {
							if(user.stateUser == "ACTIVED")
								user.lock = true
							console.log("lock: "+user.lock)
						});
					this.user.forEach(user => {
						user.urlImg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(user.img);
						console.log("urlImg: "+user.urlImg)
					});
				})
				.catch(err => {console.log("err: "+err)})
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
			this.getListUserAdmin()
	}
}
</script>

<style>

</style>