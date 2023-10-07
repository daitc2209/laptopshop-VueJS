<template>
  <header class="top-navbar">
		<div class="top-icons">
			<i class="fa-brands fa-twitter"></i> 
			<i class="fa-brands fa-facebook-f"></i> 
			<i class="fa-brands fa-instagram"></i>
			<!-- <div th:text="${#authentication.principal.id}"></div> -->
		</div>
		<div class="other-links">
			<block v-if="isAuthenticated">
				<!-- <span sec:authentication="name">Bob</span>
				<span sec:authentication="principal.authorities">[ROLE_USER, ROLE_ADMIN]</span>
				<span sec:authentication="principal.id"></span> -->
				<block v-if ="ROLE_ADMIN">
				  	<a href="/admin/home"><button id="btn-login">Admin</button></a> 
				</block>
				<a href="/logout"><button id="btn-login">Logout</button></a> 
			</block>
			<block sec:authorize="!isAuthenticated()">
				<a href="/auth/sign-in"><button id="btn-login">Login</button></a> 
			</block>
			<a href="/auth/sign-up"><button id="btn-signup">Sign up</button></a> 
			<block sec:authorize="isAuthenticated()">
				<a href="/user/purchase-history"><i class="fa-solid fa-money-check-dollar"></i></a>
				<a href="/user/profile"><i class="fa-solid fa-address-card"></i></a>
			</block>
			<a href="/cart"><i class="fa-solid fa-cart-shopping"></i></a>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
		isAuthenticated: false,
		isAdmin: false
		};
  	},
	created(){

	}
}
</script>

<style>

</style>