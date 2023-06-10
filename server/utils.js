const ApiError = require("./exceptions/api-error");

class utils {
    HttpCodes = {
        success : 200,
        badRequest: 400,
        notFound : 404
     }
    prepareSqlKeys(values) { //doing $1 $2 ... for values (for encapsulating)
        let res = []
        let sep = Object.values(values[0]).length;
        let nums = [...Array(values.length*sep).keys()].map(x => x+1);
        for(var i = 0; i < values.length; i++)
            res.push(`($${nums.slice(i*sep, (i+1)*sep).join(', $')})`);
        return res;
    }
    prepareSqlDate(date) {
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    }

    withACapital(str) {
        return str.toLowerCase().replace(/(^[a-zа-яё]{1})|(\s+[a-zа-яё]{1})/g, letter => letter.toUpperCase())
    }

    checkField(fieldName, str, tr = false) {
        var message = "Некорректные данные";
        var pattern = /\S*/;
        var min = 0;
        var max = 50;
        switch(fieldName) {
            case "name":
                message = "Некорректное имя";
                pattern = /^[a-zA-Zа-яА-Я_\-]{2,20}( [a-zA-Zа-яА-Я_\-]{2,20})?$/;
                break;
            case "email":
                message = "Некорректная почта";
                pattern = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
                break;
            case "university":
                message = "Некорректное место";
                pattern = /^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$/;
                break;
            case "city":
                message = "Некорректный город";
                pattern = /^[a-zA-Zа-яА-Я _-]{2,20}$/;
                break;
            case "ip":
                message = "Некорректный ip";
                pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
                break;
        }
        
        if(typeof str != 'string') {
            if(tr)
                throw ApiError.BadRequest(message);
            return false;
        }
        str = str.trim();
        
        if(!str || !(str.length >= min && str.length <= max && pattern.test(str))) {
            if(tr)
                throw ApiError.BadRequest(message);
            return false;
        }
        if(tr)
            return str;
        return true;
    }

    error(msg) {
        return {status: this.HttpCodes.badRequest, message: msg};
    }
    success(props) {
        return {status: this.HttpCodes.success, ...props};
    }
}

module.exports = new utils();