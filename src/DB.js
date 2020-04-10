class DB {
    constructor() {
        this.connection = require('./db_connect');
    }
    query(sql, args){
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args | [] , (err, data) =>{
                if (err)
                    return reject( err);
                return resolve(data);
            });
        });
    }
}

module.exports = DB;