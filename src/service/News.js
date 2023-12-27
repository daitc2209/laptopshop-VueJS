import axios from "./auth";

class News{
    getNews(page){
        if(page == "" || page == null)
            page = 1
        return axios.get(`/news?page=`+page);
    }

    getDetailNews(id,page){
        if(page == "" || page == null)
            page = 1
        return axios.get(`/news/detail?id=${id}&page=`+page);
    }

    getNewsAdmin(page,search){
        return axios.get(`admin/news`,{params: {search:search , page:page}})
    }

    getEditNewsAdmin(id){
        return axios.get(`admin/news/edit/${id}`)
    }

    postEditNewsAdmin(data){
        return axios.post(`admin/news/edit`,data)
    }

    postAddNewsAdmin(data){
        return axios.post("admin/news/add",data)
    }

    deleteNewsAdmin(id){
        return axios.post("admin/news/delete?id="+id)
    }
}

export default new News