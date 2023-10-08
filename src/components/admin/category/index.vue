<template>
  <div>
    <head><title>Category Page</title></head>
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Manage categories</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
                        <li class="breadcrumb-item active">Category</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    
    <section class="search">
        <div class="container">
            <form action="/admin/category" method="post">
                <h5 class="px-3 mb-4">Form search category</h5>
                <div class="row">
                    <div class="col-6 left pl-4">
                        <div class="form-group d-flex justify-content-between">
                            <label for="inputPassword6" class="col-form-label">Name:</label>
                            <input type="text" name="name" :value="name" class="form-control">
                        </div>
                    </div>
                    <div class="col-6 right pl-4">
                        <button class="btn btn-primary px-4" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <section class="content">

        <!-- Default box -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">List of categories</h3>
                <div class="card-tools">
                    <a data-bs-toggle="modal" data-bs-target="#add" class="btn btn-primary">Add new</a>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên danh mục</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="category">
                                <tr v-for="(item,index) in category" :key="item.id">
									<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
                                    <td class="td2">{{item.name}}</td>
                                    <td class="td3">
                                        <a data-bs-toggle="modal" :data-bs-target="'#edit'+item.id" class="btn btn-sm btn-primary">Edit</a> 
                                        <a @click="clickDeleteCategory(item.id)" class="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                    <div class="modal" :id="'edit'+ item.id">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <form :id="'formEditBrand'+item.id" action="" method="post">
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Edit category</h4>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
                                                            <div class="form-group">
                                                                <label for="">Id</label> 
                                                                <input type="text" name="id" :value="item.id" class="form-control" readonly="readonly" />
                                                                <div class="text-danger"></div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="">Name</label> 
                                                                <input type="text" name="name" :value="item.name" class="form-control" required="required" />
                                                                <div class="text-danger"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                                        <button @click="clickEditCategory(item.id)" type="button" class="btn btn-primary">Edit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="4">Không có bản ghi nào!!!</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <template v-if="category">
                    <form id="formCategpry" action="/admin/category" method="post">
                        <ul class="pagination mt-4" id="pagination"></ul>
                        <input hidden="" id="page"  name="page" :value="currentPage"/>
                        <input hidden="" id="totalPage" name="totalPage" :value="totalPage"/>
                        <input hidden="" name="name" value="${name}" >
                    </form>
                </template>
            </div>
        </div>
    </section>

    <div class="modal" id="add">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="/admin/category/add" method="post">
                    <div class="modal-header">
                        <h4 class="modal-title">Add new category</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
                            <div class="form-group">
                                <label for="">Name</label> 
                                <input type="text" name="name" class="form-control" placeholder="Category name" required="required" />
                                <div class="text-danger"></div>
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
            category: [{id:1},{id:2}]
        }
    },
    methods: {
        clickEditCategory(id){},
        clickDeleteCategory(id){},
        initialize() {
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
                        $('#formCategpry').submit();
                    }
                },
            });
        },
    },
	mounted() {
        this.initialize()
        this.showToastr();
        this.setupPagination();
 	},
}
</script>

<style>

</style>