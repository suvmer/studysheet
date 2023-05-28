const connection = require('../queries');
const utils = require('../utils.js');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class TableService {
    async createSchedule(user, schedule) {
        utils.checkSchedule(schedule);
        
        return utils.success();
    }
}

module.exports = new UserService();