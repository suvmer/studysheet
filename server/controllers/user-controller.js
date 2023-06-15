const fetch = require('node-fetch');
const userService = require('../service/user-service');
const {utils} = require('../utils');
const ApiError = require('../exceptions/api-error');
const tableService = require('../service/table-service');


class UserController {
  async registration(req, res, next) {
    try{
      const {name, email, password, info} = req.body;
      const userData = await userService.registration(name, email, password, info);
      if(userData.type == 'error')
        return res.json(userData);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      //httpOnly + flag 'secure' in httpS case
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try{
      const {email, password} = req.body;
      //console.log("||", email, password, "||");

      const userData = await userService.login(email, password);
      console.log("adding to cookie ", userData.refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }
  async changePassword(req, res, next) {
    try{
      const {oldpassword, newpassword} = req.body;
      const userData = await userService.changePassword(req.user.id, oldpassword, newpassword);
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }
  async changeInfo(req, res, next) {
    try{
      const {university, city} = req.body;
      const userData = await userService.changeInfo(req.user.id, university, city);
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }
  
  async logout(req, res, next) {
    try{
      const {refreshToken} = req.cookies;
      res.clearCookie('refreshToken');
      const token = await userService.logout(refreshToken);
      return res.status(token.status).json(token);
    } catch(e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try{
      //return res.json(await userService.activate(req.params.link));
      await userService.activate(req.params.link)
      return res.redirect(process.env.CLIENT_URL);
    } catch(e) {
      next(e);
    }
      
  }
  async refresh(req, res, next) {
    try{
      const {refreshToken} = req.cookies;
      //console.log(req.cookies)
      if(!refreshToken) {
        console.log("returning nope")
        return res.status(500).json({message: "nope"});
      }
      //  throw ApiError.UnauthorizedError();
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.status(userData.status).json(userData);
    } catch(e) {
      next(e);
    }

  }

  async selectSheet(req, res, next) {
    try{
      const {id} = req.body;
      const table = await tableService.getTable(id);
      if(table.table.creator.id != req.user.id)
        throw ApiError.NoPermission("Нет прав для закрепления данного расписания");
      const selectTable = await userService.selectSheet(req.user.id, table.table.id);
      return res.json(selectTable);
    } catch(e) {
      next(e);
    }
  }

  async getCity(req, res, next) {
    try {
      const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress).split(':')[3];
      let response = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`);
      let forcity = await response.json();
      //console.log(req.connection.remoteAddress, response)
      if(!forcity || !forcity['city'])
        throw Error("Невозможно определить город");
      return res.status(200).json({status: utils.HttpCodes.success, city: forcity['city']});
    } catch(e) {
      next(e);
    }
  }
  /*async getUsers(req, res) {
      try {
        
        connection.query('SELECT * FROM posts', function(err, rows, fields) {
          if (err) throw err;
          console.log('Zapros getUsers. Sended rows:', rows['rows'].length);
          res.json(rows['rows']);
        });
      } catch(e) {
          console.log(e); 
      }
  }*/
  
  async getUsers(req, res, next) {
    try{
      const users = await userService.getAllUsers();
      return res.status(users.status).json({...users, user: req.user});
    } catch(e) {
      next(e);
    }
  }
  
}

module.exports = new UserController()