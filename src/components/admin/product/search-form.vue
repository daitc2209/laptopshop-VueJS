<template>
  <div>
    <section class="search">
	<div class="container">
		<form action="/admin/product" method="post">
			<h5 class="px-3 mb-4">Form search product</h5>
			<div class="row">
				<div class="col-6 left px-4">
					<div class="form-group d-flex justify-content-between">
						<label for="" class="col-form-label">Name:</label> 
						<input type="text" v-model="formSearchProduct.name" class="form-control">
					</div>
					<div class="form-group d-flex justify-content-between">
						<label for="" class="col-form-label">Price:</label> 
						<input type="number" v-model="formSearchProduct.price" class="form-control">
					</div>
					<div class="form-group d-flex justify-content-between">
						<label for="" class="col-form-label">Category:</label> 
						<select class="form-control form-select" v-model="formSearchProduct.categoryName">
							<option selected="selected" value=""></option>
							<block v-for="item in category" :key="item.id">
								<option :value="item.name">{{item.name}}</option>
							</block>
						</select>
					</div>
				</div>
				<div class="col-6 right px-4">
					<div class="form-group d-flex justify-content-between">
						<label for="inputPassword6" class="col-form-label">Quantity:</label>
						<input type="number" v-model="formSearchProduct.quantity" class="form-control">
					</div>
					<div class="form-group d-flex justify-content-between">
						<label for="inputPassword6" class="col-form-label">Discount:</label>
						<input type="number" v-model="formSearchProduct.discount" class="form-control">
					</div>
					<div class="form-group d-flex justify-content-between">
						<label for="" class="col-form-label">Brand:</label> 
						<select class="form-control form-select" v-model="formSearchProduct.brandName">
							<option selected="selected" value=""></option>
							<block v-for="item in brand" :key="item.id">
								<option :value="item.name">{{item.name}}</option>
							</block>
						</select>
					</div>
				</div>
				<div class="d-flex justify-content-center pr-4 mb-3">
					<button class="btn btn-primary px-4" type="submit">Search</button>
				</div>
			</div>
		</form>
	</div>
</section>
  </div>
</template>

<script>
export default {
    data(){
        return{
            formSearchProduct: []
        }
    }
}
</script>

<style>

</style>