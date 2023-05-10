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
    
    checkEmail(email) {
        return (email.length >= 5 && email.length <= 30);
    }
}

module.exports = new utils();