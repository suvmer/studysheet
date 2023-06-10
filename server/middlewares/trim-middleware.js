module.exports = function(req, res, next) {
    /*Object.entries(req.body).forEach(([key, value]) => {
        if(isNaN(value)) {
            console.log(req.body[key])
            req.body[key] = (typeof value === 'string') ? value.trim() : '';
            console.log(value, typeof(value), (typeof value === 'string'), key, req.body[key])
        }
        if(Array.isArray(value))
            req.body[key] = value.map((el) => (isNaN(el) && (typeof el === 'string')) ? el.trim() : el);
    });*/
    next();
} //deprecated(PASSWORD and some fields doesnt need trim())