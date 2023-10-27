<template>
  <nav class="navbar navbar-expand-lg menu" id="navbar">
		<div class="container-fluid">
			<a class="navbar-brand" href="/home"><img src="../../../images/anh.jpg" alt="" width="180px" height="50px"></a>
			<button 
				class="navbar-toggler" 
				type="button" 
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" 
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span><i class="fa-solid fa-bars" style="color: white;"></i></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item"><a class="nav-link active" aria-current="page" href="/home">Home</a></li>
					<li class="nav-item"><a class="nav-link" href="/store">Store</a></li>
					<!-- <li class="nav-item dropdown">
						<a 
							class="nav-link dropdown-toggle" 
							href="#" id="navbarDropdown" 
							role="button" 
							data-bs-toggle="dropdown" 
							aria-expanded="false">
							Category 
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="background-color: #1c1c50;">
							<li><a class="dropdown-item" href="#">Laptop</a></li>
							<li><a class="dropdown-item" href="#">Keyboard</a></li>
							<li><a class="dropdown-item" href="#">Mouse</a></li>
							<li><a class="dropdown-item" href="#">USB</a></li>
						</ul>
					</li> -->
					<li class="nav-item"><a class="nav-link" href="/about">About</a></li>
					<li class="nav-item"><a class="nav-link" href="/contact">Contact</a></li>
					<li class="nav-item"><a class="nav-link" href="/news">News</a></li>
				</ul>
	
				<form class="d-flex form-search ">
					<input class="form-control me-2 text-search" id="inputSearch" 
					name="inputSearch" type="text" 
					placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success" type="submit" id="search-btn">Search</button>
				</form>
				<!-- <ul class="header__navbar-list">
					<li class="header__navbar-item header__navbar-user">
						<img src="/src/images/anh.jpg" alt="" class="header__navabar-user-img">
						<span class="header__navbar-user-name">Trần Đại</span>
					
						<ul class="header__navbar-user-menu">
							<li class="header__navbar-user-item">
								<a href="">Tài khoản của tôi</a>
							</li>
							<li class="header__navbar-user-item">
								<a href="">Địa chỉ của tôi</a>
							</li>
							<li class="header__navbar-user-item">
								<a href="">Đơn mua của tôi</a>
							</li>
							<li class="header__navbar-user-item header__navbar-user-item--separate">
								<a href="">Đăng xuất của tôi</a>
							</li>
						</ul>
					</li>
				</ul> -->
			</div>
		</div>
	</nav>
</template>

<script>
export default {

}
</script>

<style>
@charset "UTF-8";

#navbar {
	background-color: #1c1c50;
	font-size: 16px;
	font-family: 'Roboto Slab', serif;
}
#navbar .nav-link {
	color: white;
	font-weight: bold;
	margin-left: 5px;
	transition: 0.5s ease;
}

#navbar .nav-link:hover {
	color: white;
	border-radius: 5px;
}

.dropdown li a {
	color: white;
}
.form-search{
	width: 65%;
}
#search-btn {
	color: white;
	border: 1px solid white;
}

#search-btn:hover {
	background-color: #1c1c50;
}
.product-search{
	position: fixed;
	top: 60px;
	width: 60%;
	height: 500px;
	background: gray;
}

/* USER */
/* 
.header__navbar-list{
    list-style-type: none;
    padding-left: 0;
    margin: 4px 0 0 0;
    display: flex;
}

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
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.header__navbar-user-name{
    margin-left: 4px;
    font-size: 1.4rem;
    font-weight: 400;
}

.header__navbar-user-menu{
    z-index: 1;
    position: absolute;
    width: 160px;
    padding-left: 0;
    top: calc(100% + 6px);
    right: 0;
    border-radius: 2px;
    background-color: var(--while-color);
    list-style: none;
    box-shadow: 0 1px 2px #e0e0e0;
    display: none;
}

.header__navbar-user-menu::before{
    content: "";
    position: absolute;
    border-width: 18px 26px;
    border-style: solid;
    border-color: transparent transparent var(--while-color) transparent;
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
    font-size: 1.4rem;
    text-decoration: none;
    color: var(--text-color);
    padding: 8px 16px;
    display: block;
}

.header__navbar-user-item a:first-child{
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
}
.header__navbar-user-item a:last-child{
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}

.header__navbar-user-item a:hover{
    background-color: #fafafa;
} */

</style>