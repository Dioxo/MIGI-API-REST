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

function getTodayRevisionNotes(idUser){
    return new Promise((resolve, reject) => {
       const sql = 'SELECT id_note,title, description, have_revision ' +
                    'FROM note ' +
                    'WHERE id_user = 0 AND have_revision = true ' +
                    'AND id_note ' +
                        'IN (select id_note from note_revision where id_user = 0 and date_revision <=  CURDATE() )';

       connection.query(sql, [idUser], async (err, data) => {
          if(err)
              reject(err);

           try{
               //look to tags associates to each note
               const {getTags} = require('../notes/store');
               let tagsPromises = data.map( value => getTags(idUser, value.id_note)  );
               let tags = await Promise.all(tagsPromises);

               for(let i = 0; i < data.length ; i++)
                   data[i].tags = tags[i];

           }catch (e) {
               reject(e);
           }

          resolve(data);
       });
    });
}

module.exports = {
    addRevision,
    getTodayRevisionNotes,
};