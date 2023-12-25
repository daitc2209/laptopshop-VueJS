<template>
	<div v-if="showPreload" class="preload-screen">
		<div class="d-flex justify-content-center">
			<div class="spinner-border" role="status"></div>
				<span class="visually" style="margin-left: 20px; line-height: 30px;">Loading...</span>
		</div>
	</div>
  <section class="container login">
			<div class="row">
				<div class="breadcrumbs d-flex flex-row align-items-center col-12">
					<ul>
						<li><a href="/home">Home</a></li>
						<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Sign up</a></li>
					</ul>
				</div>
				<div class="col-md-4 col-12 p-0" id="side1">
					<div>
						<h3>Welcome Back!!</h3>
	                	<p>Login Account</p>
						<button @click="click" id="btn">Sign in</button>
					</div>
				</div>
				<div class="col-md-8 col-12 p-0" id="side2">
					<div class="form-login">
						<h3>Create Account</h3>
						<div v-if="error">
			                <div class="alert alert-danger">{{error}}</div>
			            </div>
						<div v-if="success">
			                <div class="alert alert-success">{{success}}</div>
			            </div>
			            <form v-else @submit.prevent="signUp" class="form-login">
                            <div class="inp">
                                <input v-model="user.fullname" type="text" required placeholder="Name" title="VD: Trần Công Đại">
                                <input v-model="user.address" type="text" required placeholder="Address" title="VD: Đa Hội Châu Khê">
                                <input v-model="user.email" type="email" placeholder="Email" required pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" title="VD: admin@gmail.com">
                                <input v-model="user.username" type="text" required placeholder="Username" title="VD: trandai">
                                <!-- <input v-model="password" autocomplete="" type="password" placeholder="Password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,})$" title="VD: 123"> -->
                                <input v-model="user.password" autocomplete="" type="password" placeholder="Password" required title="VD: 123">
                            </div>
                            <div id="login">
                                <button type="submit">Sign up</button>
                            </div>
                        </form>
					</div>
				</div>
			</div>
		</section>
</template>

<script>
import Users from '../../../service/User';
export default {
    data() {
		return {
			showPreload: false,
			user: {
				fullname: '',
				email: '',
				username: '',
				password: '',
				address:'',
			},
			error: '',
			success: ''
		};
    },
    methods: {
		click(){
			this.$router.push("/auth/sign-in")
		},
		signUp(){
			if(this.user.fullname != "" || this.user.username != "" || this.user.email !="" || this.user.password != "" || this.user.address != "")
			{
				this.showPreload = true
				Users.signUp(this.user)
					.then(res => {
						if (res.data.success)
							this.success = res.data.success
						if (res.data.err)
							this.error = res.data.error

						this.showPreload = false
					})
					.catch(err => {
						console.log("err: "+err)
						this.showPreload = false
					})
			}
		},
		checkVerify(){
			var url = window.location.href

			var urlParam = new URL(url)

			if(urlParam.searchParams.has("token"))
			{
				var token = urlParam.searchParams.get("token");
                Users.verify(token)
					.then(res => {
						if (res.data.success)
							this.success = res.data.success
						if (res.data.error)
							this.error = res.data.error
						
					})
					.catch(err => {
							console.log("err: "+err)
						}
					)
			}
		}
    },
	mounted(){
		if(sessionStorage.getItem("login"))
			window.location.href = '/home'
		else
        	this.signUp();

		this.checkVerify()

	}
}
</script>

<style>
.preload-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-weight: 700;
  opacity: .7;
}
</style>