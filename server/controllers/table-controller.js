const ApiError = require('../exceptions/api-error');
const tableService = require('../service/table-service');
const {dayjs, utils} = require('../utils');

/*
{
    "start": 978328800000,
    "end": 978334500000,
    "name": "Aboba",
    "cabinet": "500",
    "teacher": "Fdaf",
    "id": 0,
    "place": "7 корпус(Союзная 144)"
}
*/
class TableController {
  async addTable(req, res, next) {
    try{
      const {table} = req.body;
      await tableService.addSchedule(req.user, table);
      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
  async getTable(req, res, next) {
    try{
      const {id} = req.body;
      const table = await tableService.getTable(id);
      //console.log("Returning table ", table);
      if(table.table?.public || table.table?.creator.id == req.user?.id)
        return res.status(table.status).json(table);
      throw ApiError.NoPermission("Нет прав на просмотр данного расписания");
    } catch(e) {
      next(e);
    }
  }
  async getPublicTable(req, res, next) {
    try{
      const tableid = req.params.tableid;
      const table = await tableService.getTable(tableid);
      if(table.table?.public)
        return res.status(table.status).json(table);
      throw ApiError.UnauthorizedError();
    } catch(e) {
      next(e);
    }
  }
  async getTables(req, res, next) {
    try{
      const userid = req.params.userid;
      const tables = await tableService.getTables(userid);
      
      return res.json(tables);
    } catch(e) {
      next(e);
    }
  }
  async getMyTables(req, res, next) {
    try{
      const tables = await tableService.getTables(req.user.id);
      return res.json(tables);
    } catch(e) {
      next(e);
    }
  }
  async deleteTable(req, res, next) {
    try{
      const {id} = req.body;
      const table = await tableService.getTable(id);
      if(table.table.creator.id != req.user.id)
        throw ApiError.NoPermission("Нет прав для удаления данного расписания");
      const removeTable = await tableService.deleteTable(table.table.id);
      return res.json(removeTable);
    } catch(e) {
      next(e);
    }
  }
  async editTable(req, res, next) {
    try{
      const {table} = req.body;
      await tableService.editSchedule(req.user, table);
      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new TableController()