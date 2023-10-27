import axios from "axios"

class Products{
    getAllProduct(){
        return axios.get("getAllProduct");
    }

    getFilterProduct(sort, category, brand, price ,page){
        // return axios.get(`store`,{ params: { data: data, page: page }});
        return axios.get(`store`,{ params: { 
            sort: sort, category: category,
            brand: brand, price:price, page: page }});
    }

    postFilterProduct(data ,page){
        // return axios.get(`store`,{ params: { data: data, page: page }});
        return axios.post(`store?page=`+page,data);
    }

    getProductById(id){
        return axios.get(`store/`+id);
    }

}

export default new Products()