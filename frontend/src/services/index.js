import axios from "axios"

const API_MELI = 'http://localhost:3003';

export const getProducts = (queryString) => {
    return axios.get(`${API_MELI}/api/items?q=${queryString}`)
        .then( (res) => res.data)
        .catch((err) => err);
}

export const getProductById = (productId) => {
    return axios.get(`${API_MELI}/api/items/${productId}`)
        .then( (res) => res.data)
        .catch((err) => err);
}