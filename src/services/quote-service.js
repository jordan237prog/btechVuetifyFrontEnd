//import http from "../http-common";
import axios from 'axios';
import API from './API'
const API_URL = API + 'quotes';

class QuoteService {

    createQuote(quote) {
        return axios
            .post(API_URL, quote);
    }

    getAllQuotes(userId) {
        return axios
            .get(API_URL + '/' + userId)
    }

    deleteQuote(userId, quoteId) {
        return axios
            .delete(API_URL + '/' + userId + '/' + quoteId)
    }

    updateQuote(userId, quoteId, newQuote) {
        axios.delete(API_URL + '/' + userId + '/' + quoteId)
        axios.post(API_URL, newQuote);
    }

}

export default new QuoteService();