const userService = require('../service/user-service');


class TableController {
  async addTable(req, res, next) {
    try{
      const {table} = req.body;
      
      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
  async getTable(req, res, next) {
    try{
      const tableid = req.params.tableid;
      
      
      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
  async getTables(req, res, next) {
    try{
      const userid = req.params.userid;

      return res.json(table);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new TableController()