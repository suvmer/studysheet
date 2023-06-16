const tokenService = require('../service/token-service');
module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        //console.log("Authorization header: ", authorizationHeader);
        if(!authorizationHeader)
            return next();
        

        const accessToken = authorizationHeader.split(' ')[1];
        //console.log("accessToken: ", accessToken);
        if(!accessToken)
            return next();
    
        const userData = tokenService.validateAccessToken(accessToken);
        //console.log(userData);
        //console.log("userData: ", userData);
        if(!userData)
            return next();
    
        //console.log(Object.values(userData).join(''));
        //req.user = JSON.parse(Object.values(userData).join(''));
        req.user = userData
        next();
    } catch(e) {
        console.log(e);
        return next();
    }
}