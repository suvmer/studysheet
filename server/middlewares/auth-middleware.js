const tokenService = require('../service/token-service');
const ApiError = require('../exceptions/api-error');
module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader)
            return next(ApiError.UnauthorizedError());
        

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken)
            return next(ApiError.UnauthorizedError());
    
        const userData = tokenService.validateAccessToken(accessToken);
        console.log(userData);
        if(!userData)
            return next(ApiError.UnauthorizedError());
    
        //console.log(Object.values(userData).join(''));
        //req.user = JSON.parse(Object.values(userData).join(''));
        req.user = userData
        next();
    } catch(e) {
        console.log(e);
        return next(ApiError.UnauthorizedError());
    }
}