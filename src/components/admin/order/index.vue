<template>
  <div>
    <head>
        <title>Order Page</title>
    </head>
    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Manage order</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href='/admin/home'>Home</a></li>
							<li class="breadcrumb-item active">Order</li>
						</ol>
					</div>
				</div>
			</div>
		</section>
		
		<section class="search">
			<div class="container">
				<form method="post" action="/admin/order" object="${formSearchOrder}">
					<h5 class="px-3 mb-4">Form tìm kiếm</h5>
					<div class="row">
						<div class="col-12  px-4">
							<div class="form-group ">
								<label class="col-form-label">Tên:</label>
								<input type="text" v-model="formSearchOrder.nameOrder" class="form-control">
							</div>
							<div class="form-group">
								<label for="inputPassword6" class="col-form-label">Hình thức thanh toán:</label>
								<select class="form-control form-select" v-model="formSearchOrder.payment">
									<option selected="selected" value=""></option>
									<option value="COD">COD</option>
									<option value="TRANSFER">Chuyển khoản</option>
								</select>
							</div>
							<div class="form-group  ">
								<label for="">Trạng thái đơn hàng:</label> 
								<select class="form-control form-select" v-model="formSearchOrder.status">
									<option selected="selected" value=""></option>
									<option value="PENDING">PENDING</option>
									<option value="CONFIRMED">CONFIRMED</option>
									<option value="DELIVERING">DELIVERING</option>
									<option value="RECEIVED">RECEIVED</option>
									<option value="CANCELLED">CANCELLED</option>
								</select>
							</div>
						</div>
						<div class="d-flex justify-content-center pr-4 mb-3">
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
					<h3 class="card-title">Danh sách đơn hàng</h3>
				</div>
				<div class="card-body">
					<table class="text-center order-table">
						<thead>
							<tr>
								<th>No.</th>
								<th>Tên người đặt</th>
								<th>Ngày đặt</th>
								<th>Tổng tiền</th>
								<th>Hình thức thanh toán</th>
								<th>Thanh toán</th>
								<th>Trạng thái</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="order"> 	
									<tr :id="'trow_'+item.id" v-for="(item,index) in order" :key="item.id">
										<td class="td1" :text="index + ((currentPage - 1) * 3)">{{ index + 1 }}</td>
										<td class="td2"><h6>{{item.name}}</h6></td>
										<td class="td3"><h6>{{formatDate(item.created_at)}}</h6></td>
										<td class="td4"><h6>{{formatCurrency(item.total_money)}}</h6></td>
										<td class="td5"><h6>{{item.payment}}</h6></td>
										<td class="td6"><h6>{{item.stateCheckout}}</h6></td>
										<td class="td7"><h6>{{item.stateOrder}}</h6></td>
										<td class="td8">
											<a data-bs-toggle="modal" :data-bs-target="'#see'+item.id" class="btn btn-sm btn-primary">See</a> 
											<a v-if="item.stateOrder == 'CANCELLED'" class="btn btn-sm btn-secondary">Vertify</a>
											<a v-if="item.stateOrder != 'CANCELLED'" data-bs-toggle="modal" :data-bs-target="'#vertify'+item.id" class="btn btn-sm btn-danger">Vertify</a>
										</td>
										<div class="modal see-order" :id="'see'+item.id">
											<div class="modal-dialog">
												<div class="modal-content">
														<div class="modal-header">
															<h4 class="modal-title">Chi tiết đơn hàng</h4>
															<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
														</div>
														<div class="modal-body p-0">
															<section class="order p-0">
																<div class="container">
																	<div class="order-form">
																		<div class="row">
																			<div class="col-lg-6">
																				<div class="information-detail">
																					<h4>Thông tin đơn hàng</h4>
																					<div class="col-12 mb-2 border info-user p-3">
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Mã đơn hàng :</label> <label>#{{item.codeOrder}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>OrderId :</label> <label>#{{item.id}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>UserId :</label> <label>#{{item.user}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Họ và tên :</label> <label>{{item.name}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Email :</label> <label>{{item.email}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>SĐT :</label> <label>{{item.phone}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Địa chỉ nhận hàng :</label> <label>{{item.address_delivery}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Ngày đặt :</label> <label>{{formatDate(item.created_at)}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Số lượng sản phẩm :</label><label>{{item.num}}</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Tổng tiền :</label> <label>{{formatCurrency(item.total_money)}}đ</label>
																						</div>
																						<div class="col-lg-12 d-flex align-items-center">
																							<label>Hình thức thanh toán :</label> <label>{{item.payment}}</label>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="col-lg-6">
																				<div class="place-order">
																					<h4>Thông tin sản phẩm</h4>
																					<div class="order-total">
																						<ul class="order-table p-0">
																							<li><span>id</span><span>Sản phẩm</span><span>Số lượng</span><span>Giá</span></li>
																							<block v-for="items in item.orderdetail" :key="items.id">
																								<li class="fw-normal"><span>#{{items.product.id}}</span><span><img src="/images/product/{img}(img=${items.product.thumbnail})" width="50px" height="50px" />{{items.product.name}}</span> <span>{{items.num}}</span><span>{{formatCurrency(items.totalPrice)}}đ</span></li>
																							</block>
																							<li class="total-price">Tổng số lượng <p>{{item.num}}</p></li>
																							<li class="total-price">Tổng giá <p>{{formatCurrency(item.total_money)}}đ</p></li>
																						</ul>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</section>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
														</div>
												</div>
											</div>
										</div>

										<div class="modal" :id="'vertify'+item.id">
											<div class="modal-dialog">
												<div class="modal-content">
													<form :id="'formVerifyOrder'+item.id" action="" method="post" >
														<div class="modal-header">
															<h4 class="modal-title">Verify order</h4>
															<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
														</div>

														<div class="modal-body">
															<div id="logins-part" class="content" role="tabpanel" aria-labelledby="logins-part-trigger">
																<div class="form-group">
																	<label for="">Id</label> 
																	<input type="text" name="id" :value="item.id" class="form-control" readonly="readonly" />
																</div>
																<div class="form-group">
																	<label for="">Status</label> 
																	<select name="status" class="form-control form-select" required="required">
																		<option hidden="" :value="item.stateOrder">{{item.stateOrder}}</option>
																		<option value="CONFIRMED">CONFIRMED</option>
																		<option value="DELIVERING">DELIVERING</option>
																		<option value="RECEIVED">RECEIVED</option>
																		<option value="CANCELLED">CANCELLED</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
															<button @click="clickVerifyOrder(item.id)" type="button" class="btn btn-primary">Verify</button>
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
					<template v-if="order">
						<form id="formOrder" action="/admin/order" method="post" object="${formSearchOrder}">
							<ul class="pagination mt-4" id="pagination"></ul>
							<input hidden="" id="page"  name="page" :value="currentPage"/>
							<input hidden="" id="totalPage" name="totalPage" :value="totalPage"/>
							
							<input hidden="" v-model="formSearchOrder.nameOrder"/>
							<input hidden="" v-model="formSearchOrder.phone"/>
							<input hidden="" v-model="formSearchOrder.address"/>
							<input hidden="" v-model="formSearchOrder.totalMoney"/>
							<input hidden="" v-model="formSearchOrder.orderDate"/>
							<input hidden="" v-model="formSearchOrder.payment"/>
							<input hidden="" v-model="formSearchOrder.status"/>
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
			order: [
				{id: 1,created_at: "27/02/2023",},
				{id: 2,created_at: "21/08/2024",}
			],
            formSearchOrder: [
				
			],
        }
    },
    methods: {
        clickVerifyOrder(id){},
		formatDate(date) {
			const parts = date.split("/");
			const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
			const formatter = new Intl.DateTimeFormat("vi-VN");
			return formatter.format(formattedDate);
		},
		formatCurrency(value) {
			const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(value);
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
                        $('#formOrder').submit();
                    }
                },
            });
        },
    },
	mounted(){
		this.initialize()
		this.setupPagination()
	}
}
</script>

<style>

</style>