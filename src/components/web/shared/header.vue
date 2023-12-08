<template>
  <header class="top-navbar">
	<div class="container-fluid">
		<!-- <ul class="top-icons">
			<li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
			<li><a href=""><i class="fa-brands fa-facebook-f"></i></a></li>
			<li><a href=""><i class="fa-brands fa-twitter"></i> </a></li> -->
			<!-- <i class="fa-brands fa-twitter"></i> 
			<i class="fa-brands fa-facebook-f"></i> 
			<i class="fa-brands fa-instagram"></i> -->
		<!-- </ul> -->
		<a href="/home"><h1 class="shop-name">TCD Shop</h1></a>
		<div class="other-links">
			<template  v-if="(checklogin)">
				<!-- <template  v-if ="isAuthenticated == 'ROLE_ADMIN'">
				  	<a href="/admin/home"><button id="btn-login">Admin</button></a> 
				</template > -->
				
				<!-- <a href="/auth/sign-in"><i class="fa-solid fa-user"></i> <span>Log In</span></a>  -->
				<!-- <a @click="logout()"><button id="btn-login">Logout</button></a>  -->
			</template >
			<template  v-if="(checklogin == null)  || (checklogin == '') || (checklogin == false)">
				<a href="/auth/sign-in"><button id="btn-login">Login</button></a> 
				<a href="/auth/sign-up"><button id="btn-signup">Sign up</button></a> 
				
			</template >
			<template  v-if="(checklogin)">
				<ul class="header__navbar-list">
					<li class="header__navbar-item header__navbar-user">
							<img v-if="this.checkImg" :src="`${this.img}`"
                                alt="" class="header__navabar-user-img">
                            <img v-else :src="`/src/images/user/${this.img}`"
                                alt="" class="header__navabar-user-img">
                            <span class="header__navbar-user-name">{{ this.name }}</span>

                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <a href="/user/profile" class="header__navbar-item-link">Tài khoản của tôi</a>
                                </li>
								<li v-if  ="isAuthenticated == 'ROLE_ADMIN'" class="header__navbar-user-item">
                                    <a href="/user/purchase-history" class="header__navbar-item-link">Trang quản trị</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/purchase-history" class="header__navbar-item-link">Đơn mua của tôi</a>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a @click="logout()" class="header__navbar-item-link">Đăng xuất</a>
                                </li>
                            </ul>
                        </li>
						<li class="header__navbar-item header__navbar-user">
							<a href="/cart"><i class="header__navbar-item-link fa-solid fa-cart-shopping"></i></a>
						</li>
				</ul>
				<!-- <a href="/user/purchase-history"><i class="fa-solid fa-money-check-dollar"></i></a>
				<a href="/user/profile"><i class="fa-solid fa-address-card"></i></a> -->
			</template >
			<!-- <a href="/cart"><i class="header__navbar-item-link fa-solid fa-cart-shopping"></i></a> -->
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
			name: sessionStorage.getItem("name"),
			img: sessionStorage.getItem("img"),
			checkImg:""
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
						sessionStorage.removeItem("role"),
						sessionStorage.removeItem("img"),
						sessionStorage.removeItem("name"),
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
			this.checkImg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(this.img);
		}
  },
}
</script>

<style>
.shop-name{
	color: #1c1c50;
	font-weight: 700;
	margin-right: 20px;
	
}

/* .top-icons {
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
} */
.header__navbar-list{
    list-style-type: none;
    padding-left: 0;
    margin: 4px 0 0 0;
    display: flex;
}
.header__navbar-item{
    margin: 0 8px;
    position: relative;
    min-height: 26px;
	display: inline-flex;
}
/* User */
.header__navbar-user{
    display: flex;
    justify-items: center;
    position: relative;
}

.header__navbar-user:hover
.header__navbar-user-menu{
    display: block;
}

.header__navabar-user-img{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.header__navbar-user-name{
    margin-left: 4px;
    font-size: 18px;
    font-weight: 400;
}

.header__navbar-user-menu{
    z-index: 1;
    position: absolute;
    width: 190px;
    padding-left: 0;
    top: calc(100% + 6px);
    right: 0;
    border-radius: 2px;
    background-color: #fff;
    list-style: none;
    box-shadow: 0 1px 2px #e0e0e0;
    display: none;
}

.header__navbar-user-menu::before{
    content: "";
    position: absolute;
    border-width: 18px 26px;
    border-style: solid;
    /* transparent: trong suốt 3 cạnh và 1 cạnh màu trắng */
    /* top right bottom left */
    border-color: transparent transparent #fff transparent;
    right: 4px;
    top: -29px;
}
.header__navbar-user-menu::after{
    content: "";
    position: absolute;
    display: block;
    top: -8px;
    right: 0;
    width: 56%;
    height: 8px;
}

.header__navbar-user-item--separate{
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.header__navbar-user-item a{
    font-size: 18px;
    text-decoration: none;
    color: #000;
    padding: 8px 16px;
    /* để cho nó có thể dùng được padding margin .... */
    display: block;
}

.header__navbar-item,
.header__navbar-item-link{
    display: inline-flex;
    align-items: center;
}
</style>