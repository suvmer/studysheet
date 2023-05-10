const connection = require('../queries');
const utils = require('../utils.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');

class UserService {
    async registration(email, password) {
        //find user with email
        //if found throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        try {
            const res = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
            if(res.rows.length != 0) {
                console.log(`Found ${email}: `, res.rows);
                return `User with email ${email} is already exists!`;
            }
            
            if(!utils.checkEmail(email))
                return 'Incorrect email';

            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4(); //v34fa-asfasf-142saf-sa-asf
            

            return `Not found ${email}`;
            
        } catch(e) {
            console.log(e);
            return 'Incorrect request';
        }
    }
}

module.exports = new UserService();