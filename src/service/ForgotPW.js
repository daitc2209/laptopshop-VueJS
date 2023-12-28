import axios from "axios"

class ForgotPW{
    handleRequestForgorPW(email){
        return axios.post(`/auth/forgot-password?email=`+email);
    }

    checkTokenPW(token){
        return axios.get(`/auth/reset-password?token=`+token);
    }

    resetPW(token,newPW){
        return axios.post(`/auth/reset-password?token=${token}&newPW=${newPW}`)
    }
}

export default new ForgotPW()