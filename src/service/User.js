
import axios from "axios"

class Users{
    login(data)
    {
        return axios.post('login',data) 
    }

    loginGG(){
        return axios.post('loginCode',data1) 
    }

    getInfo(accessToken){
        return axios.post('getInfo',accessToken) 
    }

    // getInfo(accessToken){
    //     return axios.post('sso/getInfoGG',accessToken) 
    // }

    // getUserById(id){
    //     return axios.get(`user/edit/${id}`) 
    // }
    // update(id, data){
    //     return axios.put(`user/${id}`,data)
    // }

    // getUserByEmail(email){
    //     return axios.get(`user/editInformation?email=${email}`)
    // }
    // updateInfo(id,data){
    //     return axios.put(`user/editInformation?id=${id}`,data)
    // }

    // checkEmail(input){
    //     const email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    //     return email.test(input);
    // }
}

export default new Users()