<template>
  <div>
	<head><title>News Page</title></head>
    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Quản lý tin tức</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Trang chủ</a></li>
							<li class="breadcrumb-item active">Tin tức</li>
						</ol>
					</div>
				</div>
			</div>
		</section>
		
		<section class="search">
			<div class="container">
				<form action="/admin/category" method="post">
					<h5 class="px-3 mb-4">Form tìm kiếm</h5>
					<div class="row">
						<div class="col-6 left pl-4">
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Name:</label>
								<input type="text" name="name" :value="name" class="form-control">
							</div>
						</div>
						<div class="col-6 right pl-4">
							<button class="btn btn-primary px-4" type="submit">Tìm kiếm</button>
						</div>
					</div>
				</form>
			</div>
		</section>

		<section class="content">

			<!-- Default box -->
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">Danh sách tin tức</h3>
					<div class="card-tools">
						<a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary">Thêm mới</a>
					</div>
				</div>
				<div class="card-body">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th>No.</th>
								<th>Tên bài viết</th>
								<th>Mô tả ngắn</th>
								<th>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="news">
									<tr v-for="(item,index) in news" v-bind:key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
										<td class="td2">{{ item.title }}</td>
										<td class="td2">{{ item.shortDescription }}</td>
										<td class="td3">
											<a data-bs-toggle="modal" data-bs-target='#edit' class="btn btn-sm btn-primary">Edit</a> 
											<a @click="clickDeleteNew(item.id)" class="btn btn-sm btn-danger">Delete</a>
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
					<template v-if="news != '' && news != null">
						<form id="formNew" action="/admin/new" method="post">
							<ul class="pagination mt-4" id="pagination"></ul>
							<input hidden="" id="page"  name="page" :value="currentPage"/>
							<input hidden="" id="totalPage" name="totalPage" :value="totalPage"/>
						</form>
					</template>
				</div>
			</div>
		</section>

		<div class="modal add-new" id="add">
			<div class="modal-dialog">
				<div class="modal-content">
					<form action="/admin/new/add" method="post" >
						<div class="modal-header">
							<h4 class="modal-title">Thêm mới tin tức</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
								<div class="form-group">
									<label for="">Thể loại</label> 
									<select class="form-control form-select" required="required" v-model="newDto.categoryName">
										<block v-for="item in newDto.category" v-bind:key="item.id">
											<option :value="item.name">{{item.name}}</option>
										</block>
									</select>
								</div>
								<div class="form-group">
									<label for="">Tiêu đề</label> 
									<input type="text" v-model="newDto.title" class="form-control" required="required" />
									<div class="text-danger"></div>
								</div>
								<div class="form-group">
									<label for="">Hình đại diện</label> 
									<input type="text" v-model="newDto.thumbnail" class="form-control" required="required" />
									<div class="text-danger"></div>
								</div>
								<div class="form-group">
									<label for="">Mô tả ngắn</label> 
									<textarea class="form-control" v-model="newDto.shortDescription" required="required"></textarea>
									<div class="text-danger"></div>
								</div>
								<div class="form-group">
									<label for="">Nội dung</label> 
									<textarea class="form-control" id="contentAdd" v-model="newDto.content"></textarea>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
							<button type="submit" class="btn btn-primary">Thêm</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="modal add-new" id="edit">
			<div class="modal-dialog">
				<div class="modal-content">
					<form action="/admin/new/edit" method="post" >
						<div class="modal-header">
							<h4 class="modal-title">Thêm mới tin tức</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
								<div class="form-group">
									<label for="">ID</label> 
									<input type="text" id="idEdit" v-model="newDto.id" class="form-control" readonly="readonly" />
									<div class="text-danger"></div>
								</div>
								<div class="form-group">
									<label for="">Thể loại</label> 
									<select class="form-control form-select" required="required" v-model="newDto.categoryName" id="categoryEdit">
										<block v-for="item in newDto.category" v-bind:key="item.id">
											<option :value="item.name">{{item.name}}</option>
										</block>
									</select>
								</div>
								<div class="form-group">
									<label for="">Tiêu đề</label> 
									<input type="text" v-model="newDto.title" class="form-control" required="required" id="titleEdit"/>
									<div class="text-danger"></div>
								</div>
								<div class="form-group">
									<label for="">Hình đại diện</label> 
									<input type="text" v-model="newDto.thumbnail" class="form-control" required="required" id="thumbnailEdit"/>
									<div class="text-danger"></div>
								</div>
								<div class="form-group">
									<label for="">Mô tả ngắn</label> 
									<textarea class="form-control" v-model="newDto.shortDescription" required="required" id="shortDescriptionEdit"></textarea>
								</div>
								<div class="form-group">
									<label for="">Nội dung</label> 
									<textarea class="form-control" id="contentEdit" v-model="newDto.content"></textarea>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
							<button type="submit" class="btn btn-primary">Cập nhật</button>
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
            news: [{id:1,title:"first"},{id:2,title:"second"}],
            newDto: [
            ]
        }
    },
    methods: {
        clickDeleteNew(id){},
        initializeEditor() {
            this.editorAdd = CKEDITOR.replace('contentAdd');
            this.editorEdit = CKEDITOR.replace('contentEdit');
			toastr.options = {
				   "closeButton": false,
				   "debug": false,
				   "newestOnTop": false,
				   "progressBar": false,
				   "positionClass": "toast-top-right",
				   "preventDuplicates": false,
				   "onclick": null,
				   "showDuration": "300",
				   "hideDuration": "1000",
				   "timeOut": "5000",
				   "extendedTimeOut": "1000",
				   "showEasing": "swing",
				   "hideEasing": "linear",
				   "showMethod": "fadeIn",
				   "hideMethod": "fadeOut"
				 }
        },
        showToastr() {
            const add = /*[[${param.add}]]*/ '';
            if (add === 'success') {
                toastr['success']('Insert category successfully!', 'Add Category');
            } else if (add === 'fail') {
                toastr['error']('Insert category failed!', 'Add Category');
            } else if (add === 'exist') {
                toastr['error']('The category name already exists!', 'Add Category');
            }
        },
        setupPagination() {
            const currentPage ='';
            const totalPages ='';
            $('#pagination').twbsPagination({
                totalPages: totalPages ? totalPages : 1,
                visiblePages: 3,
                startPage: currentPage ? currentPage : 1,
                onPageClick: (event, page) => {
                    if (currentPage != page) {
                        $('#page').val(page);
                        $('#formNew').submit();
                    }
                },
            });
        },

    },
    mounted() {
        this.initializeEditor();
        this.showToastr();
        this.setupPagination();
 	},
}
</script>

<style>

</style>