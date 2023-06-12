const connection = require('../queries');
const {utils} = require('../utils.js');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class TableService {
    async addSchedule(user, schedule) {
        utils.checkSchedule(schedule);
        
        return utils.success();
    }
    async getTable(id) {
        if(!isNaN(id))
            throw ApiError.BadRequest("An ID is NaN");
        const fetchTable = await connection.query('SELECT * from sheets WHERE id=$1', [id]);
        if(!fetchTable.rowCount)
            throw ApiError.BadRequest("Unknown ID");
        return utils.success({table: fetchTable.rows[0]});
    }
    async getTables(userid) {
        if(!isNaN(userid))
            throw ApiError.BadRequest("An ID is NaN");
        const fetchTable = await connection.query('SELECT * from sheets WHERE creator=$1', [userid]);
        if(!fetchTable.rowCount)
            throw ApiError.BadRequest("No tables");
        return utils.success({table: fetchTable.rows});
    }
    
}

module.exports = new TableService();