import api from "../http";

export default class UtilsService {
    static async getCity() {
        return api.post('/getcity');
    }
}