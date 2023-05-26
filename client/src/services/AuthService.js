import api from "../http";

export default class AuthService {
    static async login(email, password) {
        return api.post('/login', {email, password}).then(response => response);
    }
    static async register(email, password, info) {
        return api.post('/registration', {email, password, info: info}).then(response => response);
    }
    static async logout(email, password) {
        return api.post('/logout', {email, password}).then(response => response);
    }
}
