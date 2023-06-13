module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static UnauthorizedError() {
        return new ApiError(401, 'Требуется авторизация');
    }
    static NoPermission(message, errors = []) {
        return new ApiError(403, message, errors);
    }
    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
}