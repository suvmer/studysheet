const connection = require('../queries');
const userService = require('../service/user-service');


class UserController {
  async registration(req, res) {
      try {
        const {name, email, password, info} = req.body;
        const userData = await userService.registration(name, email, password, info);
        if(userData.type == 'error')
          return res.json(userData);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        //httpOnly + flag 'secure' in httpS case
        return res.json(userData);
      } catch(e) {
          console.log(e);
          return res.json("Boba");
      }
  }
  async login(req, res) {
      try {
        const {email, password} = req.body;
        const userData = await userService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return res.json(userData);
      } catch(e) {
          
      }
  }
  async logout(req, res) {
      try {
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
      } catch(e) {
          
      }
  }
  async activate(req, res) {
      try {
        //return res.json(await userService.activate(req.params.link));
        await userService.activate(req.params.link)
        return res.redirect(process.env.CLIENT_URL);
      } catch(e) {
        console.log(e);
        return res.json("Boba");
      }
  }
  async refresh(req, res) {
      try {
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return res.json(userData);
      } catch(e) {
          
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
    try {
      const users = await userService.getAllUsers();
      return res.json({...users, user: req.user});
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new UserController()