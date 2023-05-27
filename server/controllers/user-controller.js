const fetch = require('node-fetch');
const userService = require('../service/user-service');
const utils = require('../utils');
const ApiError = require('../exceptions/api-error');


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
      console.log("||", email, password, "||");

      const userData = await userService.login(email, password);
      //console.log(userData);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try{
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
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
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.status(userData.status).json(userData);
    } catch(e) {
      next(e);
    }

  }
  async getCity(req, res, next) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      let response = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`);
      let forcity = await response.json();
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