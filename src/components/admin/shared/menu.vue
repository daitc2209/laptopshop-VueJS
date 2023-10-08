<template>
	<aside class="main-sidebar sidebar-dark-primary elevation-4">
	  <a href="/admin/home" class="brand-link">
		<img src="../../../images/anh.jpg" alt="" class="brand-image img-circle elevation-3" style="opacity: .8">
		<span class="brand-text font-weight-light">Laptopshop</span>
	  </a>
	  <div class="sidebar">
		<div class="user-panel mt-3 pb-3 mb-3 d-flex">
		  <div class="image">
			<!-- <img :src="'../images/user/' + authentication.principal.thumbnail" class="img-circle elevation-2" alt="User Image"> -->
			<img src="../../../images/anh.jpg" class="img-circle elevation-2" alt="User Image">
		  </div>
		  <div class="info">
			<!-- <a href="/admin/home" class="d-block">{{ authentication.principal.name }}</a> -->
			<a href="/admin/home" class="d-block">Quản trị viên</a>
		  </div>
		</div>
  
		<nav class="mt-2">
		  <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
			<!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->
			<li class="nav-item">
			  <a href="/admin/category" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Category
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/brand" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Brand
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/product" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Product
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/order" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Order
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/feedback" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Feedback
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/user" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				User
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/news" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				News
			  </a>
			</li>
		  </ul>
		</nav>
	  </div>
	</aside>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		authentication: {
		  principal: {
			thumbnail: 'thumbnail.jpg',
			name: 'John Doe'
		  }
		}
	  };
	}
  }
  </script>
  
  <style>
  
  </style>