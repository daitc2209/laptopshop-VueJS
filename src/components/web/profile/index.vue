<template>
  <div>
    <head>
        <title>Profile Page</title>
    </head>
    <div class="breadcrumbs d-flex flex-row align-items-center col-12 container mt-3">
			<ul>
				<li><a href="/home">Home</a></li>
				<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Profile</a></li>
			</ul>
		</div>
		<section class="container mb-4">
			<div class="row">
				<div class="col-md-4 col-12 p-0" id="side1">
					<img class="image" alt="logo"
						src="/images/user/{imgs}(imgs=${profile.img})" />
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
						<div class="col-md-4 col-12 p-0" id="side1">
							<img id="image" alt="" src="/images/user/{imgs}(imgs=${profile.img})" />
						</div>
						<div class="col-md-8 col-12 p-0" id="side2">
							<form 
								class="form-login" 
								action="/user/profile" 
								object="${profile}" 
								method="post" 
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
										onchange="chooseFile(this)" 
										type="file" 
										name="fileImage" 
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
  </div>
</template>

<script>
export default {
    data(){
        return {
            profile: {
                id: "",
                fullname:"",
                email: "",
                sex: "",
                birthday: "",
                address: ""
            }
        }
    }
}
</script>

<style>

</style>