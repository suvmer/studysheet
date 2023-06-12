const ApiError = require('../exceptions/api-error');
const tableService = require('../service/table-service');
const {utils} = require('../utils');

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
      const toStore = {
        name: '',
        creator: req.user.id,
        members: [],
        groups: [],
        info: [],
        created: Date.now(),
        tables: []
      };
      toStore.name = utils.checkField("sheetName", table.name, true);
      if(!table.tables)
        throw ApiError.BadRequest("Некорректный запрос");
      table.tables.forEach(el => {
        if(!el.start || !el.end || !el.name || el.cabinet == undefined || el.teacher == undefined || el.place == undefined)
          throw ApiError.BadRequest("Неполные данные");
        const tab = {
          "start": 0,
          "end": 0,
          "name": "",
          "cabinet": "",
          "teacher": "",
          "place": ""
        };
        if(dayjs().format('DD/MM/YYYY'))
        tab['name'] = utils.checkField("sheetName", el.name, true);
        tab['cabinet'] = utils.checkField("sheetCabinet", el.cabinet, true);
        tab['teacher'] = utils.checkField("sheetTeacher", el.teacher, true);
        tab['place'] = utils.checkField("sheetPlace", el.place, true);
      });
      toStore.tables = utils.checkField("sheetTables", table.tables, true);
      toStore.tables = utils.checkField("sheetTables", table.tables, true);
      toStore.tables = utils.checkField("sheetTables", table.tables, true);
      console.log(toStore);

      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
  async getTable(req, res, next) {
    try{
      const tableid = req.params.tableid;
      return res.json(await tableService.getTable(tableid));
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
      
      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new TableController()