const connection = require('../../db_connect');

function getNotes(idUser) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_note,title,description,have_revision FROM note WHERE id_user = ?';

        connection.query(sql, [idUser], async (err, result) =>{
            if (err)
                reject (err);
            //return result data


            for (let i = 0 ; i < result.length ; i++){
                result[i].tags = [];
                //try to insert each tag to the note they belong to
                try{
                    let data = await getTags(idUser, result[i].id_note );

                    let tags = [];
                    data.forEach( row  =>{
                        tags.push({
                            text_tag : row.text_tag,
                            color_tag : row.color_tag
                        });
                    });

                    result[i].tags = tags;
                }catch (e) {
                    reject(e);
                }
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