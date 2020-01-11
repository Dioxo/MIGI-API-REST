const debug =require('debug')('server:debug');
const connection = require('../../db_connect');

connection.connect();

function getTags(idUser) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tag where id_user = ?';
        connection.query(sql, [idUser], (err, result) =>{
            if (err)
                reject (err);
            resolve(result);
        })
    }). then(rows => {
        return rows;
    }).catch( (err) => {
        //error handling...
        debug(err);
        return [];
    });
}

module.exports = {
    getTags,
};