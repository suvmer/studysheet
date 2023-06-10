import api from "../http";

export default class ScheduleService {
    static async getUsers() {
        return api.get('/users');
    }
    static async sendTable(table) {
        console.log("sended table")
        return api.post('/schedule/add', {table});
    }
}