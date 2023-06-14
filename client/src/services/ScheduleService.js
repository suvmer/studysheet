import api from "../http";

export default class ScheduleService {
    static async getUsers() {
        return api.get('/users');
    }
    static async sendTable(table) {
        console.log("sended table")
        return api.post('/schedule/add', {table});
    }
    static async getMyTables() {
        return api.post('/schedule/my');
    }
    static async getTable(id) {
        console.log("asking for table with id ", id);
        return api.post('/schedule/get', {id});
    }
    static async editTable(table) {
        return api.put('/schedule/edit', {table});
    }
    static async deleteTable(id) {
        console.log("Send to del ", id)
        return api.delete(`/schedule/delete`, {data: {id: id}});
    }
}