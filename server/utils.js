class utils {
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

    error(msg) {
        return {status: 'error', message: msg};
    }
}

module.exports = new utils();