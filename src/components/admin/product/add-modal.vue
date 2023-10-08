<template>
  <div>
    <div class="modal" id="add">
	<div class="modal-dialog">
		<div class="modal-content">
			<form action="/admin/product/add" method="post" enctype="multipart/form-data">
				<div class="modal-header">
					<h4 class="modal-title">Add new product</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<div id="logins-part" class="content" role="tabpanel"
						aria-labelledby="logins-part-trigger">
						<div class="form-group">
							<label for="">Name</label> 
							<input type="text" v-model="productDto.name" class="form-control" required="required" />
							<div class="text-danger"></div>
						</div>
						<div class="form-group">
							<label for="">Category</label> 
							<select v-model="productDto.categoryName" class="form-control form-select" required="required">
								<block v-for="item in category" :key="item.id">
									<option :value="item.name">{{item.name}}</option>
								</block>
							</select>
							<div class="text-danger"></div>
						</div>
						<div class="form-group">
							<label for="">Brand</label> 
							<select v-model="productDto.brandName" class="form-control form-select" required="required">
								<block v-for="item in brand" :key="item.id">
									<option :value="item.name">{{item.name}}</option>
								</block>
							</select>
							<div class="text-danger"></div>
						</div>
						<div class="form-group">
							<label for="">Price</label> 
							<input type="text" v-model="productDto.price" class="form-control" required="required" />
							<div class="text-danger"></div>
						</div>
						<div class="form-group">
							<label for="">Discount</label> 
							<input type="text" v-model="productDto.discount" class="form-control" required="required" />
							<div class="text-danger"></div>
						</div>
						<div class="form-group">
							<label for="">Quantity</label> 
							<input type="text" v-model="productDto.quantity_in_stock" class="form-control" required="required" />
							<div class="text-danger"></div>
						</div>
						<div class="form-group">
							<label for="">Description</label>
							<textarea v-model="productDto.description" class="form-control" required="required" rows="4"></textarea>
<!--							<div class="text-danger"></div>-->
							<div id="quillEditor"></div>
							<input type="hidden" name="quillContent" id="quillContent">
						</div>
						<div class="form-group">
							<label for="">Img</label> 
							<input class="form-control" onchange="chooseFile(this, 'add')" type="file" name="fileImage" required="required" />
						</div>
						<div class="form-group d-flex justify-content-center">
							<img id="imageAdd" alt="" src="" height="200px" width="200px" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary">Add</button>
				</div>
			</form>
		</div>
	</div>
</div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            productDto:[]
        }
    },
    methods:{
        
    }
}
</script>

<style>

</style>