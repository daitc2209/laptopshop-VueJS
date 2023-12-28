<template>
  <div>
    <head><title>Hóa đơn</title></head>
    <section class="order p-0">
			<div class="container">
				<form class="order-form">
					<div v-if="checkout" class="row">
			        	<div class="header clearfix col-12">
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
									<div class="col-lg-12 d-flex align-items-center">
										<label>Ghi chú :</label> <label>{{order.note}}</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="place-order py-4">
								<div class="order-total">
									<ul class="order-table p-0">
										<li><span>Sản phẩm</span><span>Số lượng</span><span>Giá</span><span>Discount</span><span>Tổng</span></li>
										<div v-for="item in orderdetail" v-bind:key="item.id">
											<li class="fw-normal">
												<span><img :src="item.product.img" style="width: 50px; height: 50px;"/></span>
												<span>{{item.num}}</span>
												<span>{{formatCurrency(item.product.price)}}</span>
												<span>{{item.product.discount}}%</span>
												<span>{{formatCurrency(item.totalPrice)}}</span>
											</li>
										</div>
										<li class="total-price">Tổng số lượng <p>{{order.num}}</p></li>
										<li class="total-price">Tổng tiền <p>{{formatCurrency(order.total_money-40000)}}</p></li>
										<li class="total-price">Phí vận chuyển <p>{{formatCurrency(40000)}}</p></li>
										<li class="total-price">Thành tiền <p>{{formatCurrency(order.total_money)}}</p></li>
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
import CheckOut from '../../../service/CheckOut'
export default {
    data(){
        return{
            order: {
                codeOrder:"",
                name:"",
                email:"",
                phone:"",
                address_delivery:"",
                created_at: "27/02/2023",
                num:"",
                total_money:"",
                payment:"",
				note:''
            },
			orderdetail:{}

        }
    },
	mounted(){
		if (sessionStorage.getItem("login"))
		{
			this.getBill();
		}
		else
		{
			window.location.href = '/auth/sign-in'
			sessionStorage.setItem("err", true)
		}
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

		sendOrderConfirm(orderCode){
			CheckOut.sendEmail(orderCode)
				.then(() => console.log("success !!!"))
				.catch(() => console.log("error !!!"))
		},

		getBill(){
			if(sessionStorage.getItem("typePayment")=="COD")
			{
				CheckOut.getBill(sessionStorage.getItem("orderId"))
					.then((res)=>{
						this.order = res.data.data.order
						this.orderdetail = res.data.data.orderdetail
						sessionStorage.removeItem("typePayment")
						sessionStorage.removeItem("orderId")
						this.sendOrderConfirm(this.order.codeOrder)
					})
					.catch((err)=>{console.log("err bill: "+err)})
			}
			else{
				var url = window.location.href

				var urlParam = new URL(url)

				var vnp_Amount = urlParam.searchParams.get("vnp_Amount");
				var vnp_BankCode = urlParam.searchParams.get("vnp_BankCode");
				var vnp_CardType = urlParam.searchParams.get("vnp_CardType");
				var vnp_OrderInfo = urlParam.searchParams.get("vnp_OrderInfo");
				var vnp_PayDate = urlParam.searchParams.get("vnp_PayDate");
				var vnp_ResponseCode = urlParam.searchParams.get("vnp_ResponseCode");
				var vnp_TxnRef = urlParam.searchParams.get("vnp_TxnRef");

				CheckOut.getBillVNPAY(vnp_Amount,vnp_BankCode,vnp_CardType,
						vnp_OrderInfo,vnp_PayDate,vnp_ResponseCode,vnp_TxnRef)
						.then((res)=>{
							this.order = res.data.data.order
							this.orderdetail = res.data.data.orderdetail
							this.sendOrderConfirm(vnp_TxnRef)
						})
						.catch((err)=>{console.log("err bill VNPAY: "+err)})
			}
		}
    }
}
</script>

<style>

</style>