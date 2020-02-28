const connection = require('../../db_connect');

function addRevision( info ){
    return new Promise((resolve, reject) => {
       const sql = 'CALL addRevision(?,?,?)';

       connection.query(sql, [ info.idUser, info.idNote, info.q ], err =>{
          if (err)
              reject(err);

          resolve();
       });

    });
}


module.exports = {
    addRevision,
};