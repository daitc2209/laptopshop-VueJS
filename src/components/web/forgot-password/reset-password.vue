<template>
  <div>
    <head><title>Reset Your Password Page</title></head>
    <section class="container login">
			<div class="row">
				<div class="breadcrumbs d-flex flex-row align-items-center col-12">
					<ul>
						<li><a href="/home">Home</a></li>
						<li class="active"><a href="#">
						<i class="fa fa-angle-right" aria-hidden="true"></i>Reset Your Password</a></li>
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
						<h3>Reset Password</h3>
						<div v-if="error">
							<div class="alert alert-danger">{{error}}</div>
						</div>
						<div v-if="success">
							<div class="alert alert-success">{{success}}</div>
						</div>
						<form v-if="(success==null && error==null)"  class="form-login" action="/auth/reset-password" method="post">
							<input type="hidden" name="token" :value="token" />
							<div class="inp">
								<input id="password" type="password" placeholder="Enter your new password" name="newPassword" required autofocus>
							</div>
							<div class="inp">
								<input @input="checkPasswordMatch(this);" type="password" placeholder="Confirm your new password" required>
							</div>
							<div id="login">
								<button type="submit">Reset</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
export default {
    data(){
        return {
            success: null,
            error: null
        }
    },
    methods: {
        checkPasswordMatch(fieldConfirmPassword){
            if (fieldConfirmPassword.value != $("#password").val()) {
					fieldConfirmPassword
							.setCustomValidity("Passwords do not match!");
				} else {
					fieldConfirmPassword.setCustomValidity("");
				}
        }
    }
}
</script>

<style>

</style>