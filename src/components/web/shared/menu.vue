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
	
				<form class="d-flex form-search">
					<input class="form-control me-2 text-search" id="inputSearch" name="inputSearch" type="text" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success" type="submit" id="search-btn">Search</button>
				</form>
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
</style>