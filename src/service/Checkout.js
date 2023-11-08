import axios from "axios";

class CheckOut{
    getBill(id){
        return axios.get(`/checkout/getBill?id=`+id);
    }
    getBillVNPAY(vnp_Amount,vnp_BankCode,vnp_CardType,
        vnp_OrderInfo,vnp_PayDate,vnp_ResponseCode,vnp_TxnRef){
        return axios.get(`/checkout/vnpay/info?vnp_Amount=`+vnp_Amount
                +`&vnp_BankCode=`+vnp_BankCode
                +`&vnp_CardType=`+vnp_CardType
                +`&vnp_OrderInfo=`+vnp_OrderInfo
                +`&vnp_PayDate=`+vnp_PayDate
                +`&vnp_ResponseCode=`+vnp_ResponseCode
                +`&vnp_TxnRef=`+vnp_TxnRef);
    }
}

export default new CheckOut