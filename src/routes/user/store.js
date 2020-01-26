const connection = require('../../db_connect');

function getCredentials_NavDrawe(idUser) {
  return new Promise((resolve, reject) => {
        const sql = 'SELECT email, nickname from user where id_user = ?';
        connection.query(sql, [idUser], (err, data )=>{
        if(err)
            reject(err);

        //if there are somme credentials, they're at [0], else there's no user with these credentials
        if (data.length > 0 )
            resolve(data[0]);
        else
            resolve({});
        });
  }) ;
}


module.exports = {
    getCredentials_NavDrawe,
};