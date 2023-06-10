module.exports = function(req, res, next) {
    try {
        
        next();
    } catch(e) {
        console.log(e);
        return next(ApiError.UnauthorizedError());
    }
}