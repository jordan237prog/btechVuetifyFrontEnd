import axios from 'axios';
import API from './API'

const API_URL = API + 'bill_items/';
// const API_LINK = API + 'bill_items/'  


class Bill_items_Service {

    getBillItems() {
        return axios
            .get(API_URL);
    }

    // getBillItemsToEdit() {
        
    //     return axios
    //         .get(API_LINK);
    // }

}

export default new Bill_items_Service()