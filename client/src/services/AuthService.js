import axios from "axios";
import api from "../http";
import { API_URL } from "../config";

axios.defaults.withCredentials = true;

export default class AuthService {
    static async login(email, password) {
        return api.post('/login', {email, password});
    }
    static async register(name, email, password, info) {
        return api.post('/registration', {name, email, password, info: info});
    }
    static async changePassword(oldpassword, newpassword) {
        return api.put('/changepassword', {oldpassword, newpassword});
    }
    static async changeInfo(university, city) {
        return api.put('/changeinfo', {university, city});
    }
    
    static async logout(email, password) {
        return axios.post(`${API_URL}/logout`, {withCredentials: true});
    }
}
