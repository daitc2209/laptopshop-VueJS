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

    // Admin
    getAllOrderByStatus(){
        return axios.get(`admin/order/total-order-status`)
    }
    getListOrderByStatus(page,search_text,status){
        return axios.get("admin/order", {params:{page:page, search_text:search_text, status:status}})
    }
    findByRangeDay(page,data){
        return axios.post("admin/order/range-day?page="+page,data)
    }
    getOrderById(id){
        return axios.get("admin/order/"+id)
    }
    verify(id,status){
        return axios.post("admin/order/verify?id="+id+"&status="+status)
    }

}

export default new Order