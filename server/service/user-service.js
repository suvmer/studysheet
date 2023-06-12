const connection = require('../queries');
const {utils} = require('../utils.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class UserService {
    async getUserDto(id) {
        const user = await connection.query('SELECT name, email, id, "isActivated", "currentTable", "ownTables", regtime, info from users WHERE id=$1', [id])
        if(!user.rowCount)
            return null;
        const userDto = user.rows[0];
        return userDto;
    }
/**
 * @param {String} name
 */
    async registration(name, email, password, info) {
        //find user with email
        //if found throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        if(!info || !info.university || !info.city)
            throw ApiError.BadRequest("Неполные данные");
        name = utils.withACapital(utils.checkField("name", name, true));
        email = utils.checkField("email", email, true).toLowerCase();
        info.university = utils.withACapital(utils.checkField("university", info.university, true));
        info.city = utils.withACapital(utils.checkField("city", info.city, true));
        
        console.log(name, email, info.university, info.city)
        const res = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
        if(res.rowCount > 0) {
            console.log(`Email ${email} is already exists `);
            throw ApiError.BadRequest("Пользователь с такой почтой уже существует!");
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); //v34fa-asfasf-142saf-sa-asf
        
        await mailService.sendActivationMail(email, process.env.API_URL + "/api/activate/" + activationLink, `${name}, спасибо, что выбрали сервис StudySheet!`);
        const query = await connection.query('INSERT INTO users (name, email, password, "isActivated", "activationLink", info, "currentTable", regtime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [name, email, hashPassword, false, activationLink, info, -1, Date.now()])
        if(query.rowCount == 0)
            throw ApiError.BadRequest('Неудачная регистрация');
        
        const userDto = await this.getUserDto(query.rows[0].id);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return utils.success({...tokens, user: userDto});
    }
    async activate(activationLink) {
        const users = await connection.query(`SELECT * FROM users WHERE "activationLink" = $1`, [activationLink]);
        if(users.rowCount == 0)
            throw ApiError.BadRequest("Некорректная ссылка");

        const user = users.rows[0];
        if(user.isActivated)
            throw ApiError.BadRequest("Этот пользователь уже активирован!");
        
        //const update = await connection.query(`UPDATE users SET ("isActivated") = (ROW(TRUE)) WHERE id = $1`, [user.id]);
        const update = await connection.query(`UPDATE users SET "isActivated" = TRUE WHERE id = $1`, [user.id]);
        return utils.success({message: "Почта успешно подтверждена"});
    }
    async login(email, password) {
        email = utils.checkField("email", email, true).toLowerCase();

        const fetchUsers = await connection.query('SELECT password, id from users WHERE email=$1', [email]);
        if(fetchUsers.rowCount == 0)
            throw ApiError.BadRequest("Некорректный email или пароль");
        const user = fetchUsers.rows[0];
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals)
            throw ApiError.BadRequest("Некорректный email или пароль");
        
        const userDto = await this.getUserDto(user.id);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return utils.success({...tokens, user: userDto});
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        //console.log(token);
        if(!token)
            throw ApiError.UnauthorizedError();
        return utils.success({message: "Произошёл выход из аккаунта"});
    }
    async refresh(refreshToken) {
        //console.log("======\n\nREFRESH: refreshToken: ", refreshToken);
        if(!refreshToken)
            throw ApiError.UnauthorizedError();
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        //console.log("REFRESH: userData: ", userData);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        //console.log("REFRESH: tokenFromDb: ", tokenFromDb);
        if(!userData || !userData.id || !tokenFromDb)
            throw ApiError.UnauthorizedError();
        
        const userDto = await this.getUserDto(userData.id);
        //console.log("REFRESH: userDto: ", userDto);
        if(!userDto)
            throw ApiError.UnauthorizedError();
        const tokens = tokenService.generateTokens({...userDto});
        //console.log("REFRESH: tokens: ", tokens);

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return utils.success({...tokens, user: userDto});
    }
    async getAllUsers() {
        const users = await connection.query(`SELECT * FROM users`);
        return utils.success({users: users.rows.map(el => ({...el}))});
    }
    
}

module.exports = new UserService();