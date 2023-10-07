<template>
  <div>
    <head><title>Forgot Password Page</title></head>
    <section class="container login">
			<div class="row">
				<div class="breadcrumbs d-flex flex-row align-items-center col-12">
					<ul>
						<li><a href="/home">Home</a></li>
						<li class="active"><a href="#">
						<i class="fa fa-angle-right" aria-hidden="true"></i>Forgot password</a></li>
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
						<h3>Forgot Password</h3>
						<div v-if="error">
							<div class="alert alert-danger">{{error}}</div>
						</div>
						<div v-if="success">
							<div class="alert alert-success">{{success}}</div>
						</div>
						<form v-else action="/auth/forgot-password" method="post">
							<p>We will be sending a reset password link to your email.</p>
							<div class="inp">
								<input type="email" placeholder="Enter your e-mail" name="email" required>
							</div>
							<div id="login">
								<button type="submit">Send</button>
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

}
</script>

<style>

</style>