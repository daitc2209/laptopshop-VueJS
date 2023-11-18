<template>
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
						<a href="/auth/sign-in"><button id="btn">Sign in</button></a>
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
			user: {
				fullname: '',
				email: '',
				password: '',
				address:'',
			},
			error: '',
			success: ''
		};
    },
    methods: {
		signUp(){
			if(this.user.fullname != "" || this.user.email !="" || this.user.password != "" || this.user.address != "")
			{
				Users.signUp(this.user)
					.then(res => {
						if (res.data.success)
							this.success = res.data.success
						if (res.data.err)
							this.error = res.data.error
					})
					.catch(err => {
						console.log("err: "+err)
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

</style>