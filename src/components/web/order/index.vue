<template>
<div>
	<head><title>Đặt hàng</title></head>
  <section class="order">
			<div class="container">
				<form class="order-form" action="/order" method="post">
					<div class="row">
						<div class="breadcrumbs d-flex flex-row align-items-center col-12">
							<ul>
								<li><a href="/home">Trang chủ</a></li>
								<li class="active"><a href="#"><i
										class="fa fa-angle-right" aria-hidden="true"></i>Đặt hàng</a></li>
							</ul>
						</div>
						<div class="col-lg-6">
							<div class="information-detail">
								<h4>Thông tin đơn hàng</h4>
								<div class="col-12 mb-2 border info-user p-3">
									<div class="col-lg-12 d-flex align-items-center">
										<label>Họ và Tên : </label> <p>{{userLogin.fullname}}</p>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Email : </label> <p>{{userLogin.email}}</p>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Tổng tiền : </label> <p>{{ formatCurrency(totalMoney) }}</p>
									</div>
									<div class="col-lg-12 d-flex align-items-center">
										<label>Ngày đặt : </label> <p>{{ formatDate(orderDate) }}</p>
									</div>
								</div>
								<div class="col-12  border info-order p-3">
									<div class="col-lg-12  pb-4 ">
										<label>SĐT <span>*</span></label> 
										<input type="text" name="phone" required="required" />
									</div>
									<div class="col-lg-12  pb-4">
										<label>Địa chỉ nhận hàng <span>*</span></label> 
										<input type="text" name="address" required="required" />
									</div>
									<div class="col-lg-12 ">
										<label>Hình thức thanh toán <span>*</span></label> 
										<select class="form-control form-select" @change="typePAY()" name="typePayment" id="drTypePayment" required="required">
											<option value="COD">COD</option>
											<option value="TRANSFER">Chuyển khoản</option>
										</select>
										<div class="form-group payment mt-2" id="load-payment">
											<p>Chọn phương thức thanh toán</p>
											
											<p>Cách 1: Chuyển hướng sang Cổng VNPAY chọn phương thức thanh toán</p>
											<input type="radio" Checked="checked" id="bankCode" name="bankCode" value="NCB"> 
											<label for="bankCode">Cổng thanh toán VNPAYQR</label><br>

											<p>Cách 2: Tách phương thức tại site của đơn vị kết nối</p>
											<input type="radio" id="bankCode1" name="bankCode" value="VNPAYQR"> 
											<label for="bankCode1">Thanh toán bằng ứng dụng hỗ trợ VNPAYQR</label>
											<br> 
											<input type="radio" id="bankCode2" name="bankCode" value="VNBANK">
											<label for="bankCode2">Thanh toán qua thẻ ATM/Tài khoản nội địa</label>
											<br> 
											<input type="radio" id="bankCode3" name="bankCode" value="INTCARD"> 
											<label for="bankCode3">Thanh toán qua thẻ quốc tế</label><br>
										</div>
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
										<li class="fw-normal" v-for="(item, index) in listCart" :key="index">
												<span><img :src="item.image" width="50px" height="50px" alt="Product Image" /></span>
												<span>{{item.num}}</span>
												<span>{{ formatCurrency(item.price) }}đ</span>
										</li>
										<li class="total-price">Tổng số lượng <p>{{totalMoney}}</p></li>
										<li class="total-price">Tổng giá <p>{{ totalMoney }}đ</p></li>
									</ul>
									<div class="order-btn">
										<button type="submit" class="site-btn place-btn">Đặt hàng</button>
									</div>
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
		return {
			userLogin: {
				fullname:" tran dai",
				email: "trandai1116@gmail.com"
			},
			totalMoney: "50000",
			orderDate: "27/05/2023",
			listCart: [
				{
					num: "20",
					price: "20000"
				},
			]
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
		typePAY(){
			$("body").on("change", "#drTypePayment", function () {
				let type = $("#drTypePayment").val();
				$("#load-payment").hide();
				if (type == "TRANSFER") {
					$("#load-payment").show();
				}
			})
		}
	}
}
</script>

<style>

</style>