const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) { 
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30d'});
        return {
            accessToken, refreshToken
        };
    }

    async saveToken(userId, refreshToken) {
        const query = await connection.query('SELECT * FROM tokens WHERE userid = $1', [userId])
        if(query.rowCount == 0)
            return await connection.query('UPDATE tokens SET "refreshToken"=$1 WHERE userid = $2', [refreshToken, userId])

        return await connection.query('INSERT INTO tokens (userid, "refreshToken") VALUES ($1, $2)', [name, creator, info])
    }
}

module.exports = new TokenService();