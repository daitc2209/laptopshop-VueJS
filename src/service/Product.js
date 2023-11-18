import axios from "axios"

// class Products{
//     getAllProduct(){
//         return axios.get("getAllProduct");
//     }

//     getFilterProduct(sort, category, brand, price ,page){
//         if(page == "" || page == null)
//             page = 1
//         // return axios.get(`store`,{ params: { data: data, page: page }});
//         return axios.get(`store`,{ params: { 
//             sort: sort, category: category,
//             brand: brand, price:price, page: page }});
//     }

//     postFilterProduct(data ,page){
//         // return axios.get(`store`,{ params: { data: data, page: page }});
//         return axios.post(`store?page=`+page,data);
//     }

//     getProductById(id){
//         return axios.get(`store/`+id);
//     }
// }

const productApi = {
    getFilterProduct: async (sort, category, brand, price ,page) => {
        const res = await axios.get(`store`,{ params: { 
            sort: sort, category: category,
            brand: brand, price:price, page: page }});
        
            return res.data
    },

    // postFilterProduct: async (sort, category, brand, price ,page) => {
    //     const res = await axios.post(`store`,{ params: { 
    //         sort: sort, category: category,
    //         brand: brand, price:price, page: page }});
        
    //         return res.data
    // },

    getAllProduct: async () => {
        const res = await axios.get("getAllProduct");
        return res.data
    },

    getProductById: async (id) => {
        const res = await axios.get(`store/`+id);
        return res.data
    },

    getListProduct: async (page,search) =>{
        const res = await axios.get(`admin/product`, 
            {params: {page:page, name:search.name, price:search.price,
                 discount:search.discount, categoryName:search.categoryName, brandName: search.brandName}})
        return res.data
    },

    deleteProduct: async (id) => {
        const res = await axios.post(`admin/product/delete?id=`+id)
        return res.data
    },

    addProduct: async (data) => {
        const res = await axios.post(`admin/product/add`,data)
        return res.data
    },

    getEditProduct: async (id) => {
        const res = await axios.get(`admin/product/edit/${id}`)
        return res.data
    },

    postEditProduct: async (data) => {
        const res = await axios.post(`admin/product/edit`,data)
        return res.data
    }
}

// export default new Products();
export default productApi;