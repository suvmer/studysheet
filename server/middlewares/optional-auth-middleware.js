const tokenService = require('../service/token-service');
module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader)
            return next();

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken)
            return next();
    
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData)
            return next();
    
        req.user = userData
        next();
    } catch(e) {
        console.log(e);
        return next();
    }
}