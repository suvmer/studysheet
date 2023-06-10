import axios from "axios";
import api from "../http";

axios.defaults.withCredentials = true;

export default class AuthService {
    static async login(email, password) {
        console.log("Send auth ");
        return api.post('/login', {email, password});
    }
    static async register(name, email, password, info) {
        return api.post('/registration', {name, email, password, info: info});
    }
    static async logout(email, password) {
        return api.post('/logout');
    }
}
