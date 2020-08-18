import axios from 'axios';
import authHeader from './auth-header';
import API from './API'

 const API_URL = API + 'test/';

class UserService {
    getPublicContent(){
        return axios.get(API_URL + 'all');
    }

    getLanceBoard(){
        return axios.get(API_URL + 'Lance', { headers: authHeader()} );
    }

    getEnterpriseBoard() {
        return axios.get(API_URL + 'Enterprise', { headers: authHeader() });
    }
}

export default new UserService();