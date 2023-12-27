import axios from "./auth"

class Cart{
    addToCart(cart){
        console.log("id: "+cart.productId+"\n num: "+cart.num)
        return axios.post(`cart/add-to-cart?productId=`+cart.productId+`&num=`+cart.num);
    }

    GetItemInCart(){
        return axios.get(`cart`);
    }

    editItemCart(id,num){
        return axios.get(`cart/edit-cart/${id}/${num}`)
    }

    deleteItemCart(id){
        return axios.get(`cart/delete-cart/${id}`)
    }

    clearCart(){
        return axios.get(`cart/clear-cart`)
    }
}

export default new Cart()