<template>
    <div>

        <head>
            <title>Yêu thích</title>
        </head>
        <div id="toast">
    </div>
        <div class="breadcrumbs d-flex flex-row align-items-center col-12 container  mt-2">
            <ul class="m-0">
                <li><a href="/home">Trang chủ</a></li>
                <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Yêu thích</a></li>
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
                                        <th>Giới thiệu</th>
                                        <th>Giảm giá</th>
                                        <th>Giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="listFavour != [] && listFavour !=''">
                                        <tr v-for="item in listFavour" :key="item.id">
                                            <td class="cart-pic first-row"> <img :src="item.product.img" alt="Product Image" /></td>
                                            <td class="cart-title first-row">
                                                <router-link :to="`/store/`+item.product.id"><h5 style="color: blue;">{{ item.product.name }}</h5></router-link>
                                            </td>
                                            <td class="cart-title first-row">
                                                <h5>{{ item.product.description }}</h5>
                                            </td>
                                            <td class="discount first-row">
                                                <h5>{{ item.product.discount }}%</h5>
                                            </td>
                                            <td class="p-price first-row">
                                                <h5>{{ formatCurrency(item.product.price) }}</h5>
                                            </td>
                                            <td><a><button class="btn-favour primary-btn pd-cart" @click="addToCard(item.product.id)">Thêm vào giỏ hàng</button></a></td>
                                            <td class="close-td first-row"><a @click="deleteItem(item.id)"><i
                                                        class="ti-close fa-sharp fa-solid fa-circle-xmark"></i></a></td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="12">
                                                <h5 class="text-start p-4">Không có sản phẩm nào !!!</h5>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { showSuccessToast, showErrorToast } from "../../../assets/web/js/main";
import Favour from "../../../service/favour";
import Cart from "../../../service/Cart";
export default {
    data() {
        return {
            param: {
                err: ""
            },
            listFavour: [],
            cart: {
                productId: "",
                num:""
            }
        };
    },
    methods: {
        addToCard(id) {
            this.cart.productId=id
            Cart.addToCart(this.cart).then(()=>{
                let message = 'Đã thêm sản phẩm vào giỏ hàng ! '
                showSuccessToast(message)
            }).catch((err)=>{
                showErrorToast()
                console.log("err o trang favour khi them gio hang: "+err)
            })
        },
        formatCurrency(value) {
            const formatter = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            });
            return formatter.format(value);
        },
        deleteItem(id) {
            Favour.deleteItemFavour(id)
                .then(() => {
                    let message = 'Xóa thành công sản phẩm khỏi yêu thích ! '
                    showSuccessToast(message)
                    this.getItemInFavour()
                })
                .catch(err => console.log("xoa khong thanh cong"))
        },
        getItemInFavour() {
            Favour.GetItemInFavour().then((res) => {
                this.listFavour = res.data.data.listFavour
            }).catch((err) => { console.log("loi trang cart !!! err: " + err) })
        }
    },
    mounted() {
        this.getItemInFavour();
    },
}
</script>
  
<style>
.btn-favour{
    width: 300px;
    height: 46px;
    border: none;
    border-radius: 10px;
}
.btn-favour:hover{
    background: #1c1c50;
    color: white;
}
</style>