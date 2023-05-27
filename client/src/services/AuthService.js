import api from "../http";

export default class AuthService {
    static async login(email, password) {
        return api.post('/login', {email, password});
    }
    static async register(name, email, password, info) {
        return api.post('/registration', {name, email, password, info: info});
    }
    static async logout(email, password) {
        return api.post('/logout');
    }
}
