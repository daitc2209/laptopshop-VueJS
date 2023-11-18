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
			<div id="toast">
    		</div>
			<div class="container">
				<form @submit.prevent="search(currentPage,formSearchOrder)">
					<h5 class="px-3 mb-4">Form tìm kiếm</h5>
					<div class="row">
						<div class="col-12  px-4">
							<div class="form-group ">
								<label class="col-form-label">Tên người đặt:</label>
								<input type="text" v-model="formSearchOrder.name" class="form-control">
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
																							<span v-for="items in item.orderdetail" :key="items.id">
																								<li class="fw-normal"><span>#{{items.product.id}}</span>
																								<span><img :src="`/src/images/product/${items.product.img}`" width="50px" height="50px" />{{items.product.name}}</span> <span>{{items.num}}</span><span>{{formatCurrency(items.totalPrice)}}</span></li>
																							</span>
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
															<button @click="clickVerifyOrder(item)" type="button" class="btn btn-primary">Verify</button>
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
						<div class="pagination" id="pagination" v-if="paginationButtons.length >= 2">
							<button v-for="page in paginationButtons" :key="page" 
							:class="{ active: currentPage === page }" 
							@click="PaginationButton(page).handleClick()">
								{{ page }}
							</button>
                  		</div>
					</template>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
import Order from '../../../service/Order';
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
export default {
    data(){
        return {
			order: [],
            formSearchOrder: [],
			currentPage:'',
			totalPage:'',
			paginationButtons:[],
        }
    },
    methods: {
		getListOrder(){
			Order.getListOrder(this.currentPage,
				this.formSearchOrder.name,
				this.formSearchOrder.payment,
				this.formSearchOrder.status)
				.then(res => {
						this.order = res.data.data.listOrders.content
						this.totalPage = res.data.data.listOrders.totalPages
						this.currentPage = res.data.data.currentPage
						this.setupPagination(this.totalPage)
					
				})
				.catch(err => {
					this.order = false
				})
		},
        clickVerifyOrder(item){
			Order.verify(item.id,item.stateOrder)
				.then(res => {
					let mess=''
					if(res.data.success)
					{
						mess='Sửa thành công'
						this.showToastr(1,mess)
					}
					if(res.data.error){
						mess='Có lỗi xảy ra'
						this.showToastr(0,mess)
					}
				})
				.catch(err => {
					console.log("err: "+err)
				})
		},
		search(currentPage,formSearchOrder){
			this.getListOrder(currentPage,formSearchOrder.name,formSearchOrder.payment,formSearchOrder.stateOrder)
		},

		formatDate(date) {
			const formattedDate = new Date(date);
			const hours = ('0' + formattedDate.getHours()).slice(-2);
			const minutes = ('0' + formattedDate.getMinutes()).slice(-2);
			const day = ('0' + formattedDate.getDate()).slice(-2);
			const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
			const year = formattedDate.getFullYear();
			return `${hours}:${minutes} ${day}/${month}/${year}`;
		},
		formatCurrency(value) {
			const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(value);
		},

        showToastr(condition,message) {
            if(condition)
				showSuccessToast(message)
			
			if(condition == false)
				showErrorToast(message)
			
        },
        PaginationButton (page) {
			return {
				page,
				isActive: this.currentPage === page,
				handleClick: async () => {
					console.log("page: "+page)
					await this.loadOrders(page);
				},
			};
		},
    	setupPagination (totalPage) {
			this.paginationButtons = [];

			let page_count = totalPage;
			for (let i = 1; i < page_count + 1; i++) {
				this.paginationButtons.push(i);
			}
		},
		async loadOrders(page) {
				Order.getListOrder(page)
				.then(res => {
					this.order = res.data.data.listOrders.content
					this.totalPage = res.data.data.listOrders.totalPages
					this.currentPage = res.data.data.currentPage
				})
				.catch(err => {console.log("err: "+err)})
    	},
    },
	mounted(){
		this.getListOrder()
	}
}
</script>

<style>

</style>