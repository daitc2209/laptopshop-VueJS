import axios from "axios";

class Search {
    Search(input){
        return axios.get("search",input)
    }
}
export default new Search()