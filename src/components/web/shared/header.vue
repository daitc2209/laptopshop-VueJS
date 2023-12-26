<template>
  <header class="top-navbar">
	<div class="container-fluid">
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
				<a href="/auth/sign-in"><button id="btn-login">Đăng nhập</button></a> 
				<a href="/auth/sign-up"><button id="btn-signup">Đăng ký</button></a> 
				
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
                                    <a href="/admin/home" class="header__navbar-item-link">Trang quản trị</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/purchase-history" class="header__navbar-item-link">Đơn mua của tôi</a>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a @click="logout()" class="header__navbar-item-link">Đăng xuất</a>
                                </li>
                            </ul>
                        </li>
				</ul>
				<div class="header__navbar-item header__navbar-user">
					<router-link to="/favour"><i class="header__navbar-item-link fa-solid fa-heart"></i></router-link>
				</div>
			</template >
			<div class="header__navbar-item header__navbar-user">
				<div @click="click()"><i class="header__navbar-item-link fa-solid fa-cart-shopping"></i></div>
			</div>
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
			checklogin: "",
			name: sessionStorage.getItem("name"),
			img: sessionStorage.getItem("img"),
			checkImg:""
		};
  	},
	methods: {
		click(){
			this.$router.push("/cart")
		},
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