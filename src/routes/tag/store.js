const debug =require('debug')('server:debug');
const connection = require('../../db_connect');

connection.connect();

function getTags(idUser) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tag where id_user = ?';
        connection.query(sql, [idUser], (err, result) =>{
            if (err)
                reject (err);
            //return result data
            resolve(result);
        })
    }). then(rows => {
        //return all the rows from the query
        return rows;
    }).catch( (err) => {
        //error handling...
        debug(err);
        return [];
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
    }).then(data => {
        return data;
    }).catch(reason => {
        debug(reason);
        return {};
    })
}

module.exports = {
    getTags,
    createTag,
};