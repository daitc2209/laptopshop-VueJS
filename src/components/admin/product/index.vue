<template>
  <div>
    <head><title>Product Page</title></head>

    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Manage product</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
							<li class="breadcrumb-item active">Product</li>
						</ol>
					</div>
				</div>
			</div>
		</section>

        <Search/>

<section class="content">

			<!-- Default box -->
			<div class="card">
				<div class="card-header ">
					<h3 class="card-title mt-1">List of product</h3>
					<div class="card-tools mr-1">
						<a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary">Add new</a>
					</div>
				</div>
				<div class="card-body">
					<table class="text-center product-table">
						<thead>
							<tr>
								<th>STT</th>
								<th>Img</th>
								<th>Name</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Discount</th>
								<th>Description</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="product">
									<tr :id="'trow_'+item.id" v-for="(item,index) in product" :key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 5)">{{ index+1 }}</td>
										<td class="td2"><img src='../images/product/{img}(img=${item.thumbnail})' alt=""></td>
										<td class="td3"><h6>{{item.name}}</h6></td>
										<td class="td4"><h6>{{item.categoryName}}</h6></td>
										<td class="td5"><h6>{{item.brandName}}</h6></td>
										<td class="td6"><h6>{{formatCurrency(item.price)}}đ</h6></td>
										<td class="td7"><h6>{{item.quantity_in_stock}}</h6></td>
										<td class="td8"><h6>{{item.discount}}%</h6></td>
										<td class="td9"><h6>{{item.description}}%</h6></td>
										<td class="td10">
											<a data-bs-toggle="modal" data-bs-target="#edit"  class="btn btn-sm btn-primary">Edit</a> 
											<a @click="clickDeleteProduct(item.id)" class="btn btn-sm btn-danger">Delete</a>
										</td>
									</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="4">Không có bản ghi nào!!!</td>
								</tr>
							</template>
						</tbody>
					</table>
					<Pagination/>
				</div>
			</div>
		</section>

        <Add/>

        <Edit/>

  </div>

</template>

<script>
import Search from './search-form.vue'
import Pagination from './pagination.vue'
import Add from './add-modal.vue'
import Edit from './edit-modal.vue'
export default {
    components: {
        Search,
        Pagination,
        Add,
        Edit
    },
    data(){
        return {
			product: [
				{id: 1},
				{id: 2}
			],
        }
    },
    methods: {
        formatCurrency(value) {
			const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(value);
		},
        clickDeleteProduct(id){},
    }
}
</script>

<style>

</style>