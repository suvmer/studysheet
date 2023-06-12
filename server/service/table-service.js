const connection = require('../queries');
const {utils} = require('../utils.js');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class TableService {
    async addSchedule(user, schedule) {
        console.log("before:", schedule);

        const toStore = {...utils.checkSchedule(schedule), creator: user.id};
        console.log("after:", toStore);
        const addQuery = await connection.query('INSERT INTO sheets(name, creator, tables, created) VALUES ($1, $2, $3, $4)', [toStore.name, user.id, toStore.tables, Date.now()]);
        if(!addQuery.rowCount)
            throw ApiError.BadRequest("Не удалось добавить расписание");
        return utils.success({message: "Расписание успешно добавлено"});
    }
    async getTable(id) {
        if(isNaN(id))
            throw ApiError.BadRequest("An ID is NaN");
        const fetchTable = await connection.query('SELECT * from sheets WHERE id=$1', [id]);
        if(!fetchTable.rowCount)
            throw ApiError.BadRequest("Unknown ID");
        return utils.success({table: fetchTable.rows[0]});
    }
    async getTables(userid) {
        if(isNaN(userid))
            throw ApiError.BadRequest("An ID is NaN");
        const fetchTable = await connection.query('SELECT * from sheets WHERE creator=$1', [userid]);
        if(!fetchTable.rowCount)
            throw ApiError.BadRequest("No tables");
        return utils.success({tables: fetchTable.rows});
    }
    
}

module.exports = new TableService();