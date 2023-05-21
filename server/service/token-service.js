const jwt = require('jsonwebtoken');
const connection = require('../queries');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});
        return {
            accessToken, refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            console.log(jwt)
            return userData;
        } catch {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const query = await connection.query('SELECT * FROM tokens WHERE userid = $1', [userId])
        if(query.rowCount != 0)
            return await connection.query('UPDATE tokens SET "refreshToken"=$1 WHERE userid = $2', [refreshToken, userId])

        return await connection.query('INSERT INTO tokens (userid, "refreshToken") VALUES ($1, $2)', [userId, refreshToken])
    }
    async removeToken(refreshToken) {
        return (await connection.query('DELETE from tokens WHERE "refreshToken" = $1', [refreshToken])).rowCount;
    }
    async findToken(refreshToken) {
        const query = await connection.query('SELECT * from tokens WHERE "refreshToken" = $1', [refreshToken])
        if(query.rowCount != 0)
            return await query.rows[0];

        return null;
    }
}

module.exports = new TokenService();