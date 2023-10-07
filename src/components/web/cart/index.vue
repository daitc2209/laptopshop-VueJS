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
							<div v-if="param.err">
			                	<div class="alert alert-danger">{{param.err}} products left in stock</div>
			            	</div>
							<table>
								<thead>
									<tr>
										<th>Ảnh</th>
										<th>Tên sản phẩm</th>
										<th>Giá</th>
										<th>Số lượng</th>
										<th>Giảm giá</th>
										<th>Tổng giá</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<template v-if="listCart">
										<tr v-for="item in listCart" :key="item.id">
											<td class="cart-pic first-row"><img src='/images/product/{img}(img=${item.thumbnail})' alt=""></td>
											<td class="cart-title first-row"><h5>{{item.name}}</h5></td>
											<td class="p-price first-row"><h5>{{ formatCurrency(item.price) }}</h5></td>
											<td class="qua-col first-row">
												<div class="quantity">
													<div class="pro-qty">
														<a href="#" @click="decreaseQty(item)"><span  class="dec qtybtn">-</span> </a>
														<input class="id-1" type="text" :value="item.numProduct" readonly="readonly"> 
														<a href="#" @click="increaseQty(item)"><span  class="inc qtybtn">+</span></a>
													</div>
												</div>
											</td>
											<td class="discount first-row"><h5>{{item.discount}}</h5></td>
											<td class="total-price first-row"><h5>{{ formatCurrency(item.totalPrice) }}</h5></td>
											<td class="close-td first-row"><a href="" @click="deleteItem(item.id)"><i class="ti-close fa-sharp fa-solid fa-circle-xmark"></i></a></td>
										</tr>
									</template >
									<template v-else>
										<tr>
											<td colspan="12"><h5 class="text-start p-4">Không có bản ghi nào!!!</h5></td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
						<div class="row">
							<div class="col-lg-4"></div>
							<div class="col-lg-4 offset-lg-4">
								<div class="proceed-checkout">
									<a href='' @click="clearCart" class="proceed-btn mb-3">Clear All</a>
									<ul>
										<li class="subtotal">Tổng số lượng <span v-if="listCart">{{subCart}}</span></li>
										<li class="cart-total">Tổng tiền <span v-if="listCart">{{ formatCurrency(totalMoney) }}</span></li>
									</ul>
									<a href='/order' class="proceed-btn">PROCEED TO ORDER</a>
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
export default {
    data() {
        return {
        param: {
            err: ""
        },
        listCart: [{id:1, name:"pro1", price: "30000", numProduct:10},{id:2, name:"pro2", price: "48200", numProduct:0}],
        subCart: 0,
        totalMoney: 0
        };
    },
    methods: {
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
      }
    },
    increaseQty(item) {
        item.numProduct++;
    },
    deleteItem(id) {
      // Call API
    },
    clearCart() {
      // Call API
    }
  }
}
</script>

<style>

</style>