import api from "../http";

export default class ScheduleService {
    static async getUsers() {
        return api.get('/users');
    }
}
response.data