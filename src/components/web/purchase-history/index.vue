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
		<div id="toast">
    	</div>
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
													<label>{{ item.num }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Tổng tiền :</label>
													<label>{{ formatCurrency(item.total_money) }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Hình thức thanh toán :</label>
													<label>{{ item.payment }}</label>
												</div>
												<div class="col-lg-12 d-flex align-items-center">
													<label>Ghi chú :</label>
													<label>{{ item.note }}</label>
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
														<li class="fw-normal" v-for="(orderdetail, index) in item.orderdetail" :key="index">
																<span><img :src="`/src/images/product/`+orderdetail.product.img" style="height: 50px; width: 50px;" alt="Product Image" /></span>
																<span>{{orderdetail.num}}</span>
																<span>{{ formatCurrency(orderdetail.price) }}</span>
														</li>
														<li class="total-price">Tổng số lượng <p>{{item.num}}</p></li>
														<li class="total-price">Tổng giá <p>{{ formatCurrency(item.total_money) }}</p></li>
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
import User from '../../../service/User';
import {showSuccessToast,showErrorToast } from "../../../assets/web/js/main";
export default {

  data() {
    return {
      order: [],
    };
  },
  methods: {
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

	getPurchaseHistory(){
		User.getPurchaseHistory()
			.then((res)=>{
				this.order = res.data.data.order
			})
			.catch((err)=>{console.log("loi purchase history !!!" + err)})
	},


	clickCancelOrder(id){
		User.postPurchaseHistory(id)
			.then((res)=>{
				if(res.data){
					$('#trow_' + id + ' .td7').empty();
					$('#cancelOrderBtn_' + id).empty();
					$('#trow_' + id + ' .td7').append(`<h6>${res.data.data}</h6>`);
						$('.modal').modal('hide');
						let message = 'Hủy đơn hàng thành công'
						showSuccessToast(message)
						// toastr["success"]('Cancel order successfully!', "Cancel Order")
				}else{
						// toastr["error"]('Cancel order failed!', "Cancel Order")
						showErrorToast()
				}
			})
			.catch((err)=>{console.log("loi purchase history !!!" + err)})
	},
	showSuccessToast(message){
		showSuccessToast(message)
    },
	showErrorToast(){
		showErrorToast()
    },
  },
  mounted(){
	this.getPurchaseHistory()
  }
};
</script>
  
<style>
</style>