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
			<div class="container">
				<form action="/admin/user"  method="post" :object="formSearchUser">
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
								<label for="inputPassword6" class="col-form-label">Birthday:</label>
								<input type="text" v-model="formSearchUser.birthday" class="form-control" />
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
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Role:</label>
								<select class="form-control form-select" v-model="formSearchUser.role">
									<option selected="selected" value="0"></option>
									<option value="1">ROLE_ADMIN</option>
									<option value="2">ROLE_USER</option>
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
								<th>Sex</th>
								<th>Birthday</th>
								<th>Address</th>
								<th>State User</th>
								<th>Auth Type</th>
								<th>Role</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="user">
									<tr :id="'trow_'+item.id" v-for="(item,index) in user" v-bind:key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
										<td class="td2"><img src='' alt=""></td>
										<td class="td3"><h6>{{ item.fullname }}</h6></td>
										<td class="td4"><h6>{{item.email}}</h6></td>
										<td class="td5"><h6>{{item.sex}}</h6></td>
										<td class="td6"><h6>{{item.birthday}}</h6></td>
										<td class="td7"><h6>{{item.address}}</h6></td>
										<td class="td8"><h6>{{item.stateUser}}</h6></td>
										<td class="td9"><h6>{{item.authType}}</h6></td>
										<td class="td10"><h6>{{item.role}}</h6></td>
										<td class="td11">
											<a data-bs-toggle="modal" data-bs-target="#edit" class="btn btn-sm btn-primary">Edit</a> 
											<a @click="clickClockUser(item.id)" class="btn btn-sm btn-danger">Clock</a>
											<a @click="clickUnClockUser(item.id)" class="btn btn-sm btn-danger">unClock</a>
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
					<template v-if="user">
						<form id="formUser" action="/admin/user" method="post">
							<ul class="pagination mt-4" id="pagination"></ul>
							<input hidden="" id="page"  name="page" :value="formSearchUser.currentPage"/>
							<input hidden="" id="totalPage" name="totalPage" :value="formSearchUser.totalPage"/>
							
							<input hidden="" v-model="formSearchUser.fullname"/>
							<input hidden="" v-model="formSearchUser.sex"/>
							<input hidden="" v-model="formSearchUser.birthday"/>
							<input hidden="" v-model="formSearchUser.address"/>
							<input hidden="" v-model="formSearchUser.email"/>
							<input hidden="" v-model="formSearchUser.stateUser"/>
							<input hidden="" v-model="formSearchUser.authType"/>
							<input hidden="" v-model="formSearchUser.role"/>
						</form>
					</template>
				</div>
			</div>
		</section>

		<div class="modal" id="add">
			<div class="modal-dialog">
				<div class="modal-content">
					<form action="/admin/user/add" method="post">
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
									<label for="">Password</label> 
									<input autocomplete="" type="password" v-model="formAddUser.password" class="form-control" required="required" />
								</div>
								<div class="form-group">
									<label for="">Role</label> 
									<select class="form-control form-select" v-model="formAddUser.role" required="required">
										<option hidden="" value="0"></option>
										<option value="1">ROLE_ADMIN</option>
										<option value="2">ROLE_USER</option>
									</select>
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
		<div class="modal" id="edit">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id="formEditUser" action="/admin/user/edit" method="post" enctype="multipart/form-data">
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
									<select class="form-control form-select" id="sexEdit" v-model="formEditUser.sex" >
										<option value="MALE">MALE</option>
										<option value="FEMALE">FEMALE</option>
									</select>
								</div>
								<div class="form-group">
									<label for="">Birthday</label> 
									<input type="text" class="form-control" id="birthdayEdit" v-model="formEditUser.birthday" />
								</div>
								<div class="form-group">
									<label for="">Address</label> 
									<input type="text" class="form-control" id="addressEdit" v-model="formEditUser.address" />
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
									<label for="">AuthType</label> 
									<select class="form-control form-select" id="authTypeEdit" v-model="formEditUser.authType" required="required">
										<option value="DATABASE">DATABASE</option>
										<option value="GOOGLE">GOOGLE</option>
										<option value="FACEBOOK">FACEBOOK</option>
									</select>
								</div>
								<div class="form-group">
									<label for="">Role</label> 
										<select class="form-control form-select" id="roleEdit" v-model="formEditUser.role" required="required">
										<option value="1">ROLE_ADMIN</option>
										<option value="2">ROLE_USER</option>
									</select>
								</div>
								<div class="form-group">
									<label for="">Img</label> 
									<input hidden="" type="text" v-model="formEditUser.img" id="imgEdit" /> 
									<input class="form-control" onchange="chooseFile(this, 'edit')" type="file" id="fileImage" name="fileImage" />
								</div>
								<div class="form-group d-flex justify-content-center">
									<img id="imageEdit" alt="" class="imgEdit" src="" height="200px" width="200px"/>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
							<button type="button" @click="clickEditUser()" class="btn btn-primary">Edit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
    data(){
        return {
			user: [
				{id: 1},
				{id: 2}
			],
            formSearchUser: [
				
			],
            formAddUser: {

            },
            formEditUser: {

            }
        }
    },
    methods: {
        clickClockUser(id){},
        clickUnClockUser(id){},
        clickEditUser(){}
    }
}
</script>

<style>

</style>