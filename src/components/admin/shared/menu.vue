<template>
	<aside class="main-sidebar sidebar-dark-primary elevation-4">
	  <a href="/admin/home" class="brand-link" style="text-align: center;">
		<span class="brand-text font-weight-light">TCD Laptopshop</span>
	  </a>
	  <div class="sidebar">
		<div class="user-panel mt-3 pb-3 mb-3 d-flex">
		  <div class="info">
			<a href="/admin/home" class="d-block"><i class="fa-solid fa-house mr-2"></i><label style="color: #fff; cursor: pointer;">Trang chủ</label></a>
		  </div>
		</div>
  
		<nav class="mt-2">
		  <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
			<!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->
			<label for="" style="color: #fff;">Quản lý</label>
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
			<label for="" style="color: #fff;">Thống kê</label>
			<li class="nav-item">
			  <a href="/admin/revenue/categories" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Categories
			  </a>
			</li>
			<li class="nav-item">
			  <a href="/admin/revenue/products" class="nav-link">
				<i class="nav-icon fa-solid fa-bars"></i>
				Products
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