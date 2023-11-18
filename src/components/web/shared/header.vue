<template>
  <header class="top-navbar">
	<div class="container-fluid">
		<ul class="top-icons">
			<li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
			<li><a href=""><i class="fa-brands fa-facebook-f"></i></a></li>
			<li><a href=""><i class="fa-brands fa-twitter"></i> </a></li>
			<!-- <i class="fa-brands fa-twitter"></i> 
			<i class="fa-brands fa-facebook-f"></i> 
			<i class="fa-brands fa-instagram"></i> -->
		</ul>
		<div class="other-links">
			<template  v-if="(checklogin)">
				<template  v-if ="isAuthenticated == 'ROLE_ADMIN'">
				  	<a href="/admin/home"><button id="btn-login">Admin</button></a> 
				</template >
				<a @click="logout()"><button id="btn-login">Logout</button></a> 
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
	</div>

	</header>
</template>

<script>
import Users from '../../../service/User'
import axios from 'axios';
export default {
	data() {
		return {
			isAuthenticated: sessionStorage.getItem("role"),
			isAdmin: false,
			checklogin: "",
		};
  	},
	methods: {
		logout(){
			axios.defaults.headers.Authorization = `Bearer ${sessionStorage.getItem("jwtToken")}`;
			Users.logout(sessionStorage.getItem("jwtToken"))
				.then(res => {
					console.log(res)
					if(res.data.responseCode == "0")
					{
						window.location.href = "/auth/sign-in"
						// this.$router.push("/auth/sign-in")
						// this.checklogin = false
						sessionStorage.removeItem("login"),
						sessionStorage.removeItem("jwtToken"),
						sessionStorage.removeItem("refreshToken"),
						sessionStorage.removeItem("role")
						sessionStorage.setItem("logout",true)
					}
					
				})
				.catch(err => {
					console.log("err: "+err)
				})
		},
	},
	mounted() {
		// this.emitter.on("login-success", () => {
		// 	this.checklogin = sessionStorage.getItem("login"); // Thay đổi trạng thái đăng nhập trong header
		// 	console.log("checklogin: "+this.checklogin)
		// });
		if(sessionStorage.getItem("login")){
			this.checklogin = sessionStorage.getItem("login");
		}
  },
}
</script>

<style>

.top-icons {
	position: relative;
	display: flex;
	margin-bottom: 0px;
}

.top-icons li{
	position: relative;
	list-style: none;
	margin: 0 20px;
	cursor: pointer;
}
.top-icons li a {
	text-decoration: none;
}

.top-icons li a .fa-brands{
	font-size: 20px;
	color: #222;
}

.top-icons li::before {
	font-family: "FontAwesome";
	position: absolute;
	top: 0;
	left: 0;
	font-size: 20px;
	height: 0;
	overflow: hidden;
	transition: 0.5s ease-in-out;
	margin: -4px 0 0 10px;
}

.top-icons li:nth-child(1)::before {
	content: "\f16d";
	background-image: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%, #cc2366 75%,#bc1888 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	border-bottom: 4px solid #dc2743;
}

.top-icons li:nth-child(2)::before {
	content: "\f09a";
	color: #25D366;
	border-bottom: 4px solid #25D366;
}

.top-icons li:nth-child(3)::before {
	content: "\f099";
	color: #1DA1F2;
	border-bottom: 4px solid #1DA1F2;
}

.top-icons li:hover::before {
	height: 110%;
}

</style>