const debug =require('debug')('server:debug');
const connection = require('../../db_connect');

function getTags(idUser) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tag where id_user = ?';
        connection.query(sql, [idUser], (err, result) =>{
            if (err)
                reject (err);
            //return result data
            resolve(result);
        })
    });
}

function createTag(tag){
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tag (id_user, text_tag, color_tag) VALUES ( ? , ? , ?)';

        connection.query(sql, [tag.idUser, tag.textTag, tag.colorTag], (err, result) => {
            if (err)
                reject(err);

            //associate tag to its id
            tag.idTag = result.insertId;
            resolve(tag);
        })
    });
}

function getTag(userData){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id_tag from tag where id_user = ? and text_tag = ?';

        connection.query(sql, [userData.idUser, userData.textTag ] , (err, data) =>{
           if (err)
               reject( err);

           resolve(data);
        });
    });
}

function countTags(idUser){
    return new Promise((resolve, reject) => {
       const sql = 'select text_tag, count(id_note) as count_tag ' +
                            'from note_tag NATURAL RIGHT JOIN tag ' +
                            'where id_user =0 GROUP BY id_tag ORDER BY text_tag ASC';

       connection.query(sql, [idUser] , (err, data) =>{
          if (err)
              reject(err);

          resolve(data);
       });
    });
}

module.exports = {
    getTags,
    createTag,
    getTag,
    countTags,
};