const connection = require('../queries');
const userService = require('../service/user-service');


class authController {
  async registration(req, res) {
      try {
        console.log(req.body);
        const rs = await userService.registration(req.body.email, req.body.password);
        res.json(rs);
      } catch(e) {
          
      }
  }
  async login(req, res) {
      try {

      } catch(e) {
          
      }
  }
  async logout(req, res) {
      try {

      } catch(e) {
          
      }
  }
  async activate(req, res) {
      try {

      } catch(e) {
          
      }
  }
  async refresh(req, res) {
      try {

      } catch(e) {
          
      }
  }
  async getUsers(req, res) {
      try {
        
        connection.query('SELECT * FROM posts', function(err, rows, fields) {
          if (err) throw err;
          console.log('Zapros getUsers. Sended rows:', rows['rows'].length);
          res.json(rows['rows']);
        });
      } catch(e) {
          console.log(e); 
      }
  }
}

module.exports = new authController()