const express = require('express');
const router = express.Router();

const response = require('../../response');
const errors = require('../../errors');
const store = require('./store');
const debug =require('debug')('server:debug');

router.get('/' , async (req, res) => {
    if (req.query.hasOwnProperty('idUser')){
        try {
            let result = await store.getNotes(req.query.idUser);
            response.success(res, result);
        }catch (err) {
            debug(err);
        }
    }else{
        response.error(res, errors[0]);
    }



});


router.post('/', async(req,res) => {
    if (!req.body.hasOwnProperty('id_user') ||
        !req.body.hasOwnProperty('description') ||
        !req.body.hasOwnProperty('title') )
        return response.error(res,errors[0]);

    let note = {
        id_user : req.body.id_user,
        title : req.body.title,
        description : req.body.description,
    };

   let result = await store.createNote(note);

   response.success(res, result);
});



module.exports = router;