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
    
    checkName(name) {
        if(!name) return false;
        return  (name.length <= 50 && (/^[a-zA-Zа-яА-Я_-]{2,20} [a-zA-Zа-яА-Я_-]{2,20}$/.test(name)));
    }
    
    checkEmail(email) {
        if(!email) return false;
        return  (email.length <= 50 && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)));
    }
    checkIp(ip) {
        if(!ip) return false;
        return  ((/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)));
    }

    error(msg) {
        return {status: this.HttpCodes.badRequest, message: msg};
    }
    success(props) {
        return {status: this.HttpCodes.success, ...props};
    }
}

module.exports = new utils();