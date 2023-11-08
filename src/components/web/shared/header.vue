<template>
  <header class="top-navbar">
		<div class="top-icons">
			<i class="fa-brands fa-twitter"></i> 
			<i class="fa-brands fa-facebook-f"></i> 
			<i class="fa-brands fa-instagram"></i>
		</div>
		<div class="other-links">
			<template  v-if="(checklogin)">
				<template  v-if ="isAuthenticated == 'ROLE_ADMIN'">
				  	<a href="/admin/home"><button id="btn-login">Admin</button></a> 
				</template >
				<a href="/logout" @click="logout()"><button id="btn-login">Logout</button></a> 
			</template >
			<template  v-if="(checklogin == null)  || (checklogin == '') || (checklogin == false)">
				<a href="/auth/sign-in"><button id="btn-login">Login</button></a> 
				<a href="/auth/sign-up"><button id="btn-signup">Sign up</button></a> 
			</template >
			<template  v-if="(checklogin)">
				<a href="/user/purchase-history"><i class="fa-solid fa-money-check-dollar"></i></a>
				<a href="/user/profile"><i class="fa-solid fa-address-card"></i></a>
			</template >
			<a href="/cart"><i class="fa-solid fa-cart-shopping"></i></a>
		</div>

	</header>
</template>

<script>
export default {
	data() {
		return {
			isAuthenticated: "",
			isAdmin: false,
			checklogin: "",
		};
  	},
	methods: {
		logout(){
			sessionStorage.removeItem("login"),
			sessionStorage.removeItem("jwtToken"),
			sessionStorage.removeItem("refreshToken"),
			sessionStorage.removeItem("role"),
			this.$router.push("/home")
		},
	},
	mounted() {
		this.emitter.on("login-success", () => {
			this.checklogin = sessionStorage.getItem("login"); // Thay đổi trạng thái đăng nhập trong header
			console.log("checklogin: "+this.checklogin)
		});
		if(sessionStorage.getItem("login")){
			this.checklogin = sessionStorage.getItem("login");
		}
  },
}
</script>

<style>

</style>