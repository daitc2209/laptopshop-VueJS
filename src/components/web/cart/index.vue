<template>
  <div>
    <head><title>Trang giỏ hàng</title></head>
    <div class="breadcrumbs d-flex flex-row align-items-center col-12 container  mt-2">
			<ul class="m-0">
				<li><a href="/home">Trang chủ</a></li>
				<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Giỏ hàng</a></li>
			</ul>
		</div>
		
    	<section class="shopping-cart ">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div class="cart-table">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>Tên sản phẩm</th>
										<th>Giá</th>
										<th>Số lượng</th>
										<th>Giảm giá</th>
										<th>Tổng</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<template v-if="listCart">
										<tr v-for="item in listCart" :key="item.id">
											<td class="cart-pic first-row"><img :src="'/src/images/product/' + item.img" alt=""></td>
											<td class="cart-title first-row"><h5>{{item.name}}</h5></td>
											<td class="p-price first-row"><h5>{{ formatCurrency(item.price) }}</h5></td>
											<td class="qua-col first-row">
												<div class="quantity">
													<div class="pro-qty">
														<a @click=" item.numProduct > 1 ? decreaseQty(item) : null" ><span class="dec qtybtn" :class="{ disabled: item.numProduct <= 1 }">-</span> </a>
														<input class="id-1" type="text" :value="item.numProduct" readonly="readonly"> 
														<a @click="increaseQty(item)"><span  class="inc qtybtn">+</span></a>
													</div>
												</div>
											</td>
											<td class="discount first-row"><h5>{{item.discount}}%</h5></td>
											<td class="total-price first-row"><h5>{{ formatCurrency(item.totalPrice) }}</h5></td>
											<td class="close-td first-row"><a @click="deleteItem(item.productId)"><i class="ti-close fa-sharp fa-solid fa-circle-xmark"></i></a></td>
										</tr>
									</template >
									<template v-else>
										<tr>
											<td colspan="12"><h5 class="text-start p-4">Không có sản phẩm nào !!!</h5></td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
						<div class="row">
							<div class="col-lg-4"></div>
							<div class="col-lg-4 offset-lg-4">
								<div class="proceed-checkout">
									<a @click="clearCart" class="proceed-btn mb-3">Xóa tất cả</a>
									<ul>
										<li class="subtotal">Tổng số lượng <span v-if="listCart">{{totalQuantity}}</span></li>
										<li class="cart-total">Tổng tiền <span v-if="listCart">{{ formatCurrency(totalMoney) }}</span></li>
									</ul>
									<a @click="click" class="proceed-btn">Mua ngay</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
import { decFunction, incFunction, showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import Cart from "../../../service/Cart";
export default {
    data() {
        return {
        param: {
            err: ""
        },
        listCart: [],
        totalQuantity: '',
        totalMoney: ''
        };
    },
    methods: {
		click(e){
			e.preventDefault()
			if(this.listCart)
				this.$router.push("/order")
			else{
				this.$router.push("/store")
				sessionStorage.setItem("cart-empty",1)
			}
			
		},
		formatCurrency(value) {
			const formatter = new Intl.NumberFormat("vi-VN", {
				style: "currency",
				currency: "VND",
			});
			return formatter.format(value);
		},
		decreaseQty(item) {
			if (item.numProduct > 0) {  //Call API 
				item.numProduct--; 
				this.totalMoney -= item.totalPrice	// trừ hẳn tổng tiền cũ của sản phẩm
				item.totalPrice = item.price*item.numProduct - (item.price * item.numProduct * item.discount/100);

				this.totalQuantity= this.totalQuantity-1
				this.totalMoney += item.totalPrice	// cộng tổng tiền mới của sản phẩm

				Cart.editItemCart(item.productId,-1)
					.then((res)=>{console.log("giam thanh cong")})
					.catch((err)=>{console.log("loi giam ")})
			}
		},
		increaseQty(item) {
			item.numProduct++;
			this.totalMoney -= item.totalPrice
			item.totalPrice = item.price*item.numProduct - (item.price * item.numProduct * item.discount/100);

			this.totalQuantity = this.totalQuantity+1
			this.totalMoney += item.totalPrice

			Cart.editItemCart(item.productId,1)
				.then((res)=>{console.log("tang thanh cong")})
				.catch((err)=>{console.log("loi tang ")})
		},
		deleteItem(id) {
			console.log("id: "+id)
			Cart.deleteItemCart(id)
				.then((res) => {
					console.log("xoa thanh cong")
					this.getItemIncart()
				})
				.catch(err => console.log("xoa khong thanh cong"))
		},
		clearCart() {
			Cart.clearCart()
				.then((res)=>{
					console.log("clear thanh cong")
					this.getItemIncart()
				})
				.catch((err)=>{
					console.log("clear that bai")
				})
		},
		getItemIncart(){
			Cart.GetItemInCart().then((res)=>{
			this.listCart = res.data.data.listCartItems
			this.totalQuantity = res.data.data.totalQuantity
			this.totalMoney = res.data.data.totalMoney
		}).catch((err)=>{console.log("loi trang cart !!! err: "+ err)})
		}
  	},
	mounted(){
		this.getItemIncart();
	},
}
</script>

<style>

</style>