import axios from 'axios';

export default class ProductService {

    getProductsSmall() {
        return axios.get('horas.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('horas.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('horas.json').then(res => res.data.data);
    }
}