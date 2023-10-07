<template>
  <div>
    <head><title>Hóa đơn</title></head>
    <section class="order p-0">
			<div class="container">
				<form class="order-form">
					<div v-if="checkout" class="row">
			        	<div class="header clearfix col-12">
			        	<h3 v-if="success" class="text-muted">{{success}}</h3>
			        	<h3 v-if="error" class="text-muted">{{error}}</h3>
			            </div>
			            <div class="table-responsive col-12">
			                <div class="form-group">
			                    <label >Mã giao dịch người bán:</label>
			                    <label>{{vnp_TxnRef}}</label>
			                </div>    
			                <div class="form-group">
			                    <label >Số tiền:</label>
			                    <label>{{formatCurrency(vnp_Amount)}}</label>
			                </div>  
			                <div class="form-group">
			                    <label >Nội dung:</label>
			                    <label>{{vnp_OrderInfo}}</label>
			                </div> 
			                <div class="form-group">
			                    <label >VNPAY Response Code:</label>
			                    <label>{{vnp_ResponseCode}}</label>
			                </div> 
			                <div class="form-group">
			                    <label >VNPAY Transaction Code:</label>
			                    <label>{{vnp_TransactionNo}}</label>
			                </div> 
			                <div class="form-group">
			                    <label >Tên ngân hàng:</label>
			                    <label>{{vnp_BankCode}}</label>
			                </div> 
			                <div class="form-group">
			                    <label >Ngày thanh toán:</label>
			                    <label>{{vnp_PayDate}}</label>
			                </div> 
			            </div>
			        </div>
					<div class="row">
						<div class="col-12 pt-4">
			                <h3 class="text-center">Đặt hàng thành công</h3>
			            </div>
						<div class="col-lg-6">
							<div class="information-detail py-4">
								<div class="col-12 mb-2 border info-user p-3">
									<div class="col-lg-12 d-flex align-items-center">
										<label>Mã hóa đơn :</label>  <label>#{{order.codeOrder}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Họ và tên :</label>  <label>{{order.name}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Email :</label> <label>{{order.email}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>SĐT :</label> <label>{{order.phone}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Địa chỉ nhận hàng :</label> <label>{{order.address_delivery}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Ngày đặt hàng :</label>  <label>{{formatDate(order.created_at)}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Số lượng :</label><label>{{order.num}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Tổng tiền :</label> <label>{{formatCurrency(order.total_money)}}</label>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Hình thức thanh toán :</label> <label>{{order.payment}}</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="place-order py-4">
								<div class="order-total">
									<ul class="order-table p-0">
										<li><span>Sản phẩm</span><span>Số lượng</span><span>Giá</span></li>
										<div v-for="item in orderdetail" v-bind:key="item.id">
											<li class="fw-normal"><span><img src="/images/product/{img}(img=${item.product.thumbnail})" width="50px" height="50px"/></span> <span>{{item.num}}</span><span>{{formatCurrency(item.totalPrice)}}</span></li>
										</div>
										<li class="total-price">Tổng số lượng <p>{{order.num}}</p></li>
										<li class="total-price">Tổng giá <p>{{formatCurrency(order.total_money)}}</p></li>
									</ul>
								</div>
							</div>
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
            error:"",
            success:"",
            order: {
                codeOrder:"",
                name:"",
                email:"",
                phone:"",
                address_delivery:"",
                created_at: "27/02/2023",
                num:"",
                total_money:"",
                payment:""
            }

        }
    },
    methods: {
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
    }
}
</script>

<style>

</style>