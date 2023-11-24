import axios from "axios";

const revenueApi = {
    getRevenueCategories: async () => {
        const res = await axios.get(`/admin/revenue/categories`)
        return res.data
    },

    getRevenue: async () => {
        const res = await axios.get(`/admin/revenue`)
        return res.data
    },

    getRevenueYear: async (year) => {
        const res = await axios.get(`/admin/revenue/`+year)
        return res.data
    },

    getRevenueProducts: async () => {
        const res = await axios.get(`/admin/revenue/products`)
        return res.data
    }
}

export default revenueApi;