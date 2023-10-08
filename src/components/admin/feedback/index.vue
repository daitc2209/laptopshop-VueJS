<template>
  <div>
    <head><title>Feedback Page</title></head>
    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Manage feedback</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
							<li class="breadcrumb-item active">Feedback</li>
						</ol>
					</div>
				</div>
			</div>
		</section>
		
		<section class="search">
			<div class="container">
				<form action="">
					<h5 class="px-3 mb-4">Form search feedback</h5>
					<div class="row">
						<div class="col-6 left pl-4">
							<div class="form-group d-flex justify-content-between">
								<label for="inputPassword6" class="col-form-label">Date:</label>
								<input type="text" class="form-control">
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
					<h3 class="card-title">List of feedback</h3>
					<div class="card-tools">
					</div>
				</div>
				<div class="card-body">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th>STT</th>
								<th>Name</th>
								<th>Email</th>
								<th>Message</th>
								<th>Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="feedback">
									<tr v-for="item in feedback" :key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
										<td>{{ item.name }}</td>
										<td>{{ item.email }}</td>
										<td>{{ item.message }}</td>
										<td>{{ formatDate(item.created_at) }}</td>
										<td><a  class="btn btn-sm btn-primary">Sửa</a> </td>
									</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="4">Không có bản ghi nào!!!</td>
								</tr>
							</template>
						</tbody>
					</table>
					<template v-if="feedback">
						<form id="formFeedback" action="/admin/feedback" method="post">
							<ul class="pagination mt-4" id="pagination"></ul>
							<input hidden="" id="page"  name="page" :value="currentPage"/>
							<input hidden="" id="totalPage" name="totalPage" :value="totalPage"/>
						</form>
					</template>
				</div>
			</div>
		</section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            feedback:[{id:1,created_at:"20/12/2023"}]
        }
    },
    methods:{
        formatDate(date) {
			const parts = date.split("/");
			const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
			const formatter = new Intl.DateTimeFormat("vi-VN");
			return formatter.format(formattedDate);
		},
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
                        $('#formFeedback').submit();
                    }
                },
            });
        },
    },
	mounted(){
		this.initialize()
	}
}
</script>

<style>

</style>