import axios from "axios"

class Favour{
    addToFavour(id){
        return axios.post(`favour/add-to-favour?productId=`+id);
    }

    GetItemInFavour(){
        return axios.get(`favour`);
    }

    deleteItemFavour(id){
        return axios.post(`favour/delete-favour?id=`+id)
    }
}

export default new Favour()