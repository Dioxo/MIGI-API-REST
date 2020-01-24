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

module.exports = {
    getNotes,
};