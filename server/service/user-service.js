const connection = require('../queries');
const utils = require('../utils.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');

class UserService {
    async registration(name, email, password, info) {
        //console.log(name, email, password, info)
        //find user with email
        //if found throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        
        if(!utils.checkName(name))
            return utils.error('Incorrect name');
        if(!utils.checkEmail(email))
            return utils.error('Incorrect email');

        /*const res = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
        if(res.rowCount > 0) {
            console.log(`Email ${email} is already exists `);
            return utils.error(`User with email ${email} is already exists!`);
        }*/

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); //v34fa-asfasf-142saf-sa-asf
        
        const query = await connection.query('INSERT INTO users (name, email, password, "isActivated", "activationLink", info, "currentTable") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [name, email, hashPassword, false, activationLink, info, -1])
        
        if(query.rowCount == 0)
            return utils.error('Failed to create user');
        
        //const user = await connection.query('SELECT row_to_json(row(name, email, id, "isActivated")) from users WHERE id=$1', [query.rows[0].id])
        const user = await connection.query('SELECT name, email, id, "isActivated" from users WHERE id=$1', [query.rows[0].id])
        await mailService.sendActivationMail(email, process.env.API_URL + "/api/activate/" + activationLink, `${name}, спасибо, что выбрали сервис StudySheet!`);
        
        const userDto = JSON.stringify(user.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, status: utils.HttpCodes.success, user: userDto};
    }
    async activate(activationLink) {
        const users = await connection.query(`SELECT * FROM users WHERE "activationLink" = $1`, [activationLink]);
        if(users.rowCount == 0)
            return utils.error("Некорректная ссылка");

        const user = users.rows[0];
        if(user.isActivated)
            return utils.error("Этот пользователь уже активирован!");
        
        //const update = await connection.query(`UPDATE users SET ("isActivated") = (ROW(TRUE)) WHERE id = $1`, [user.id]);
        const update = await connection.query(`UPDATE users SET "isActivated" = TRUE WHERE id = $1`, [user.id]);
        return {status: utils.HttpCodes.success, message: "Почта успешно подтверждена"};
    }
    async login(email, password) {
        if(!utils.checkEmail(email))
            return utils.error('Incorrect email');
        const fetchUsers = await connection.query('SELECT password, id from users WHERE email=$1', [email]);

        if(fetchUsers.rowCount == 0)
            return utils.error("Некорректный email или пароль");
        const user = fetchUsers.rows[0];
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals)
            return utils.error("Некорректный email или пароль");
        
        const fetchInfo = await connection.query('SELECT name, email, id, "isActivated" from users WHERE id=$1', [user.id]);
        const userDto = JSON.stringify(fetchInfo.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, status: utils.HttpCodes.success, user: userDto};
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        console.log(token);
        return token;
    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            return utils.error("Не авторизованы");
        }
        const userDate = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userDate || !tokenFromDb) {
            return utils.error("Не авторизованы");
        }

        const fetchInfo = await connection.query('SELECT name, email, id, "isActivated" from users WHERE id=$1', [user.id]);
        const userDto = JSON.stringify(fetchInfo.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, status: utils.HttpCodes.success, user: userDto};
    }
    async getAllUsers() {
        const users = await connection.query(`SELECT * FROM users`);
        return users.rows.map(el => ({...el}));
    }
    
}

module.exports = new UserService();