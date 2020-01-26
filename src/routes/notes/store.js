const connection = require('../../db_connect');

function getNotes(idUser) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_note,title,description,have_revision FROM note WHERE id_user = ?';

        connection.query(sql, [idUser], async (err, result) =>{
            if (err)
                reject (err);

            try{
                //look to tags associates to each note
                let tagsPromises = result.map( value => getTags(idUser, value.id_note)  );
                let tags = await Promise.all(tagsPromises);

                for(let i = 0; i < result.length ; i++)
                    result[i].tags = tags[i];

            }catch (e) {
                reject(e);
            }

            resolve(result);
        })
    })
}
//
function getTags(idUser, idNote){
    return new Promise((resolve, reject) => {

        const sql = 'select text_tag, color_tag from note_tag natural join tag where id_user = ? and id_note = ?  GROUP BY text_tag';
        connection.query(sql, [idUser, idNote], (err, result ) => {
            if (err)
                reject(err);

            resolve(result);
        });

    })  ;
}

function createNote(note){
    return new Promise((resolve, reject) => {
       const sql = 'INSERT INTO note (id_user,title,description) VALUES (?,?,?)';
       connection.query(sql, [note.id_user, note.title, note.description], (err, data) => {
          if (err)
              reject(err);

          note.id_note = data.insertId;
          resolve(note);
       });
    });
}

function deleteNote(note){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM  note WHERE id_note= ? AND id_user= ?';
        connection.query(sql, [note.idNote, note.idUser], (err, data) => {
           if (err)
               reject(err);

           resolve(data.affectedRows);

        });

    });
}

module.exports = {
    getNotes,
    createNote,
    deleteNote,
};