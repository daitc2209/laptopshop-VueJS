import axios from "axios";

class Order{
    getOrder(){
        return axios.get(`order`);
    }
    postOrder(data){
        return axios.post(`order`,data);
    }
    getBill(id){
        return axios.get(`checkout/getBill?id=`+id);
    }
}

export default new Order