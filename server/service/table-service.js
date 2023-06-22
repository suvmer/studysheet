const connection = require('../queries');
const {utils} = require('../utils.js');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class TableService {
    async addSchedule(user, schedule) {
        const fetchTables = await connection.query(`SELECT sheets.id, sheets.name, json_build_object('id', users.id, 'name', users.name, 'info', users.info) AS creator, sheets.members, sheets.groups, sheets.info, sheets.public, sheets.tables, sheets.created from sheets JOIN users ON sheets.creator = users.id AND users.id = $1`, [user.id]);
        if(fetchTables.rowCount >= 3)
            throw ApiError.BadRequest("Разрешено иметь не более трёх расписаний");

        const toStore = {...utils.checkSchedule(schedule), creator: user.id};
        const addQuery = await connection.query('INSERT INTO sheets(name, creator, tables, created, public) VALUES ($1, $2, $3, $4, $5)', [toStore.name, user.id, JSON.stringify(toStore.tables), Date.now(), toStore.public]);
        if(!addQuery.rowCount)
            throw ApiError.BadRequest("Не удалось добавить расписание");
        return utils.success({message: "Расписание успешно добавлено"});
    }
    async editSchedule(user, schedule) {
        if(!schedule.id)
            throw ApiError.BadRequest("Не удалось обновить расписание");
        const table = await this.getTable(schedule.id);
        if(table.table.creator.id != user.id)
            throw ApiError.NoPermission("Нет прав для редактирования данного расписания");
        
        const toStore = {...utils.checkSchedule(schedule), creator: user.id};
        const addQuery = await connection.query('UPDATE sheets SET (name, tables, info, public) = ($1, $2, $3, $4) WHERE id = $5', [toStore.name, JSON.stringify(toStore.tables), JSON.stringify(toStore.info), toStore.public, table.table.id]);
        if(!addQuery.rowCount)
            throw ApiError.BadRequest("Не удалось обновить расписание");
        return utils.success({message: "Расписание успешно обновлено"});
    }
    async getTable(id) {
        if(isNaN(id))
            throw ApiError.BadRequest("ID is NaN");
        //const fetchTable = await connection.query('SELECT * from sheets WHERE id=$1', [id]);
        const fetchTable = await connection.query(`SELECT sheets.id, sheets.name, json_build_object('id', users.id, 'name', users.name, 'info', users.info) AS creator, sheets.members, sheets.groups, sheets.info, sheets.public, sheets.tables, sheets.created from sheets JOIN users ON sheets.creator = users.id AND sheets.id = $1`, [id]);
        if(!fetchTable.rowCount)
            throw ApiError.NotFound("Расписание не найдено");
        return utils.success({table: {...fetchTable.rows[0], tables: JSON.parse(fetchTable.rows[0].tables)}});
    }
    async getTables(userid) {
        if(isNaN(userid))
            throw ApiError.BadRequest("ID is NaN");
        const fetchTable = await connection.query(`SELECT sheets.id, sheets.name, json_build_object('id', users.id, 'name', users.name, 'info', users.info) AS creator, sheets.members, sheets.groups, sheets.info, sheets.public, sheets.tables, sheets.created from sheets JOIN users ON sheets.creator = users.id AND users.id = $1`, [userid]);
        //const fetchTable = await connection.query('SELECT * from sheets WHERE creator=$1', [userid]);
        if(!fetchTable.rowCount)
            throw ApiError.BadRequest("No tables");
        return utils.success({tables: fetchTable.rows});
    }

    async deleteTable(id) {
        if(isNaN(id))
            throw ApiError.BadRequest("ID is NaN");
        const fetchTable = await connection.query('DELETE FROM sheets WHERE id = $1', [id]);
        if(!fetchTable.rowCount)
            throw ApiError.BadRequest("No tables to delete");
        return utils.success({tables: fetchTable.rows});
    }
    
}

module.exports = new TableService();