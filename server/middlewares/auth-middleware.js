const tokenService = require('../service/token-service');
module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(new Error("Не авторизован"));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(new Error("Не авторизован"));
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(new Error("Не авторизован"));
        }
        req.user = userData;
        next();
    } catch(e) {
        return next(new Error("Не авторизован"));
    }
}