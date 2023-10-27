<template>
  <section class="container login">
			<div class="row">
				<div class="breadcrumbs d-flex flex-row align-items-center col-12">
					<ul>
						<li><a href="/home">Home</a></li>
						<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Sign in</a></li>
					</ul>
				</div>
				<div class="col-md-4 col-12 p-0" id="side1">
					<div>
						<h3>Hello Friend!</h3>
						<p>Create New Account</p>
						<a href="/auth/sign-up"><button id="btn">Sign up</button></a>
					</div>
				</div>
				<div class="col-md-8 col-12 p-0" id="side2">
					<form class="form-login" @submit.prevent="login">
						<div v-if="param.error">
			                <div class="alert alert-danger">Invalid Email or Password</div>
			            </div>
			            <div v-if="param.logout">
			                <div class="alert alert-success"> You have been logged out.</div>
			            </div>
			            <div v-if="param.accessDenied">
			                <div class="alert alert-danger"> You not authorize</div>
			            </div>
						<h3>Login Account</h3>
						<div class="inp">
							<input v-model="user.email" type="text" name="username" id="username" placeholder="User Name" required> 
							<input v-model="user.password" autocomplete="" type="password" name="password" id="password" placeholder="Password" required>
						</div>
						<div class="m-0 p-2 mt-2"><input type="checkbox" /> Remember me</div>
						<p class="m-0"><a href="/auth/forgot-password">Forgot Your Password</a></p>
						<div id="login">
							<a href="http://localhost:8080/oauth2/authorization/google"><button  type="button"><i class="fa-brands fa-google"></i> &ensp; Sign in by Gmail</button></a>
						</div>
						<div id="login">
							<button type="submit">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		</section>
</template>

<script>

import Users from '../../../service/User';
export default {
	data() {
        return {
            user: {
                email: '',
                password: '',
                role: []
            },
            param: {
				error: false,
				logout: false,
				accessDenied: false
			},
            display: 'none',
        }
    },
	methods: {
		login(){
			console.log("user: "+this.user)
			Users.login(this.user)
				.then((res) =>{
					console.log(res)
					console.log("res data accessToken: "+ res.data.accessToken)
					console.log("role: "+ res.data.role)
					if(res.data != null){
						sessionStorage.setItem("login", true)
						sessionStorage.setItem("jwtToken", res.data.accessToken)
						sessionStorage.setItem("refreshToken", res.data.refreshToken)
						sessionStorage.setItem("role", res.data.role)
						this.emitter.emit("login-success");
						this.$router.push("/home");
						// window.location.reload();
					}
				})
				.catch((err) => {
					this.param.error = true
					console.log("err: " + err)
				})
		},
		loginGG(){

			var url = window.location.href

			var urlParam = new URL(url)

			if(urlParam.searchParams.has("token") && urlParam.searchParams.has("refreshToken") && urlParam.searchParams.has("role"))
			{
				var token = urlParam.searchParams.get("token");
                var refreshToken = urlParam.searchParams.get("refreshToken");
                var role = urlParam.searchParams.get("role");
				sessionStorage.setItem("jwtToken",token);
                sessionStorage.setItem("refreshToken", refreshToken);
                sessionStorage.setItem("role", role);
				sessionStorage.setItem("login", true)
				this.emitter.emit("login-success");
				this.$router.push("/home");
			}
		}
	},
	mounted(){
		this.loginGG();
	}
}
</script>

<style>

</style>