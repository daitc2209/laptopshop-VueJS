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
    getListOrder(page,name,payment,status){
        return axios.get("admin/order", {params:{page:page, name:name, payment:payment, status:status}})
    }

    verify(id,status){
        return axios.post("admin/order/verify",{params:{id:id, status:status}})
    }
}

export default new Order