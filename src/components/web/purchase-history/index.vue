<template>
  <div>
	<head><title>Lịch sử mua hàng</title></head>
    <section class="breadcrumbs d-flex flex-row align-items-center col-12 container p-0 mt-2">
      <ul class="m-0">
        <li>
          <a href="/home">Trang chủ</a>
        </li>
        <li class="active">
          <a href="#">
            <i class="fa fa-angle-right" aria-hidden="true"></i>Lịch sử mua hàng
          </a>
        </li>
      </ul>
    </section>

    <section class="purchase-history p-0">
      <div class="container">
        <div class="row">
          <h3 class="text-center mb-4">Danh sách đơn hàng</h3>
        </div>
        <div class="row">
          <table>
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
                <tr v-for="(item, index) in order" :key="item.id" :id="'trow_' + item.id">
                  <td class="td1">{{ index + 1 }}</td>
                  <td class="td2">
                    <h6>{{ item.name }}</h6>
                  </td>
                  <td class="td3">
                    <h6>{{ formatDate(item.created_at) }}</h6>
                  </td>
                  <td class="td4">
                    <h6>{{ formatCurrency(item.total_money) }}</h6>
                  </td>
                  <td class="td5">
                    <h6>{{ item.payment }}</h6>
                  </td>
                  <td class="td6">
                    <h6>{{ item.stateCheckout }}</h6>
                  </td>
                  <td class="td7">
                    <h6>{{ item.stateOrder }}</h6>
                  </td>
                  <td class="td8 text-primary">
                    <h6 data-bs-toggle="modal" :data-bs-target="'#Modal' + item.id">See details</h6>
					</td>

					<div class="modal" :id="'Modal' + item.id">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h4 class="modal-title">Chi tiết đơn hàng</h4>
									<button id="openModal" type="button" class="btn-close" data-bs-dismiss="modal" ></button>
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
													<label>Mã đơn hàng:</label>
													<label>#{{ item.codeOrder }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Họ và tên :</label>
													<label>{{ item.name }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Email :</label>
													<label>{{ item.email }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>SĐT :</label>
													<label>{{ item.phone }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Địa chỉ nhận hàng :</label>
													<label>{{ item.address_delivery }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Ngày đặt:</label>
													<label>{{ formatDate(item.created_at) }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Số lượng :</label>
													<label>{{ item.quantity }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Tổng tiền :</label>
													<label>{{ formatCurrency(item.total_money) }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Hình thức thanh toán :</label>
													<label>{{ item.payment }}</label>
												</div>
												</div>
											</div>
											</div>
											<div class="col-lg-6">
											<div class="place-order">
												<h4>Thông tin sản phẩm</h4>
												<div class="order-total">
													<ul class="order-table p-0">
														<li><span>Sản phẩm</span><span>Số lượng</span><span>Giá</span></li>
														<li class="fw-normal" v-for="(product, index) in item.products" :key="index">
																<span><img :src="product.image" width="50px" height="50px" alt="Product Image" /></span>
																<span>{{product.quantity}}</span>
																<span>{{ formatCurrency(product.price) }}đ</span>
														</li>
														<li class="total-price">Tổng số lượng <p>{{item.quantity}}</p></li>
														<li class="total-price">Tổng giá <p>{{ formatCurrency(item.price) }}đ</p></li>
													</ul>
													<div :id="'cancelOrderBtn_'+ item.id" v-if="(item.stateOrder !== 'CANCELLED' && item.stateOrder !== 'RECEIVED')" class="order-btn"><a @click="clickCancelOrder(item.id)"><button type="button" class="site-btn place-btn">Hủy đơn hàng</button></a></div>
																								
												</div>
											</div>
											</div>
										</div>
										</div>
									</div>
									</section>
								</div>
								<!-- Modal footer -->
								<div class="modal-footer">
									<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
            	</tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="8">
                    <h5 class="text-start p-4">Không có bản ghi nào!!!</h5>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </section>


  </div>
</template>
  
  <script>
export default {

  data() {
    return {
      order: [
		{
          id: 1,
          name: "Product 1",
          stateOrder: "CANCELLED",
          total_money: "30000",
		  created_at: "27/02/2023",
		  quantity: '10',
		  products: [
				{
					code: 1,
					name: "Product 1",
					quantity: "10",
					price: "32000",
				},
			],
        },
		{
          id: 2,
          name: "Product 2",
          stateOrder: "RECEIVED",
          total_money: "313000",
		  created_at: "27/05/2023",
		  quantity: '10',
		  products: [
				{
					code: 2,
					name: "Product 2",
					quantity: "12",
					price: "33123000",
				},
			],
        },
		],
    };
  },
  methods: {
	mounted(){
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
	clickCancelOrder(id){
		const firstPath = location.pathname.split('/')[1];
		$.ajax({
			url: '/'+firstPath+'/'+"user/purchase-history/delete",
			async: false,  
			type: "post",
			data: { id: id },
			success:function(res){
				if(res.data){
					$('#trow_' + id + ' .td7').empty();
					$('#cancelOrderBtn_' + id).empty();
					$('#trow_' + id + ' .td7').append(`<h6>${res.data.stateOrder}</h6>`);
						$('.modal').modal('hide');
						Command: toastr["success"](res.message, "Cancel Order")
				}else{
						Command: toastr["error"](res.message, "Cancel Order")
				}
			}
		});
	},
  }
};
</script>
  
<style>
</style>