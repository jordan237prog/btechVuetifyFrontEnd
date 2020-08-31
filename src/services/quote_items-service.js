import axios from 'axios';
import API from './API'

const API_URL = API + 'quote_items/';



class Quote_items_Service {

    getQuoteItems() {
        return axios
            .get(API_URL);
    }
}

export default new Quote_items_Service()