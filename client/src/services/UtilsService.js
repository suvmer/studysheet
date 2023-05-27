import api from "../http";

export default class UtilsService {
    static async getCity() {
        console.log(api.post('/getcity', [ip: ]));
    }
}