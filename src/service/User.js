
import axios from "axios"

class Users{

    signUp(data){
        return axios.post('register',data) 
    }
    verify(data){
        return axios.get('register/verify?token='+data) 
    }

    login(data)
    {
        return axios.post('login',data) 
    }

    loginGG(){
        return axios.post('loginCode',data1) 
    }

    logout(token){
        return axios.get("logout?token="+token)
    }

    getInfo(accessToken){
        return axios.post('getInfo',accessToken) 
    }

    getPurchaseHistory(status){
        return axios.get('purchase-history?status='+status);
    }

    postPurchaseHistory(id,status){
        return axios.post(`purchase-history/delete?id=`+id+`&status=`+status)
    }

    findByRangeDay(data){
        return axios.post(`purchase-history/range-day`,data)
    }

    getTotalOrderReceived(){
        return axios.get('purchase-history/totalOrder');
    }

    postProfile(data){
        return axios.post('user/profile', data)
    }

    getProfile(){
        return axios.get('user/profile')
    }

    postChangePW(oldPW, newPW){
        return axios.post('user/profile/change-password?oldPW='+oldPW+'&newPW='+newPW)
    }

    getListUserAdmin(page, fullname,sex,address,email,stateUser,authType){
        return axios.get('admin/user',
            {params: {fullname:fullname,sex:sex,address:address,
                    email:email,stateUser:stateUser,authType:authType,page:page}}) 
    }

    getListAdmin(page, fullname,sex,address,email,stateUser,authType){
        return axios.get('admin/user/getAdmin',
            {params: {fullname:fullname,sex:sex,address:address,
                    email:email,stateUser:stateUser,authType:authType,page:page}}) 
    }

    addUser(data){
        return axios.post("admin/user/add",data)
    }

    getEditUser(id){
        return axios.get("admin/user/edit/"+id)
    }

    postEditUser(data){
        return axios.post("admin/user/edit",data)
    }

    lockUser(id){
        return axios.post("admin/user/lock?id="+id)
    }

    unlockUser(id){
        return axios.post("admin/user/unlock?id="+id)
    }

    deleteUser(id){
        return axios.post("admin/user/delete?id="+id)
    }
}

// const Users = {
//     signUp: async (data) => {
//         const res = await axios.post('register',data)
//         return res; 
//     },

//     verify: async (data) => {
//         const res = await axios.get('register/verify?token='+data) 
//         return res;
//     },

//     login: async (data) => {
//         const res = await axios.post('login',data) 
//         return res;
//     }
// }

export default new Users();
// export default Users;