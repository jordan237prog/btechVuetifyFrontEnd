import axios from 'axios';
import API from './API'

const API_URL = API +"auth/"

class AuthService {

    login(user){
        return axios
            .post(API_URL + 'signin', {
                username : user.username,
                password: user.password
            })
            .then( response => {
                if (response.data.accessToken){
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data
            });
    }

    logout(){
        localStorage.removeItem('user');
    }

    register(user) {
        return axios
            .post(API_URL + 'signup', {
                username : user.username,
                email    : user.email,
                password : user.password,
                roles    : [user.roles]
            });
    }

}

export default new AuthService();