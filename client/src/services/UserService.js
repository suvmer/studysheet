import api from "../http";
export default class UserService {
    static async selectSheet(id) {
        return api.post('/schedule/select', {id});
    }
}
