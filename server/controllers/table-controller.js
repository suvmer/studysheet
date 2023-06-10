const ApiError = require('../exceptions/api-error');
const tableService = require('../service/table-service');


class TableController {
  async addTable(req, res, next) {
    try{
      const {table} = req.body;
      console.log(table);
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