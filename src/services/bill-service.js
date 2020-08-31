//import http from "../http-common";
import axios from 'axios';
import API from './API'
const API_URL = API + 'bills';

class BillService {

    createBill(bill) {
        return axios
            .post(API_URL, bill);
    }

    getAllBills(userId){
        return axios
            .get(API_URL + '/'+userId)
    }

    deleteBill(userId, billId) {
        return axios
            .delete(API_URL + '/' + userId + '/' + billId)
    }

    updateBill(userId, billId, newBill) {
        axios.delete(API_URL + '/' + userId + '/' + billId)
        axios.post(API_URL, newBill);
    }

}

export default new BillService();