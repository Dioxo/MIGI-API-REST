const connection = require('../../db_connect');

function getNotes(idUser) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_note,title,description,have_revision FROM note WHERE id_user = ?';

        connection.query(sql, [idUser], (err, result) =>{
            if (err)
                reject (err);
            //return result data
            resolve(result);
        })
    })
}

module.exports = {
    getNotes,
};