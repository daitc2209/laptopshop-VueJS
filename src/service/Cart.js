import axios from "axios"

class Cart{
    addToCart(cart){
        return axios.post(`cart/add-to-cart`,cart);
    }
}

export default new Cart()