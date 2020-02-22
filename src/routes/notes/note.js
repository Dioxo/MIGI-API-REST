const express = require('express');
const router = express.Router();

const response = require('../../response');
const errors = require('../../errors');
const store = require('./store');
const debug =require('debug')('server:debug');

router.get('/:idUser' , async (req, res) => {
    try {
        let result = await store.getNotes(req.params.idUser);
        response.success(res, result);
    }catch (err) {
        debug(err);
    }

});


router.post('/:idUser', async(req,res) => {
    if (!req.body.hasOwnProperty('description') ||
        !req.body.hasOwnProperty('title') )
        return response.error(res,errors[0]);

    let note = {
        id_user : req.params.idUser,
        title : req.body.title,
        description : req.body.description,
    };

   let result = await store.createNote(note);

   response.success(res, result);
});


router.delete('/:idUser', async (req, res) => {
    if ( !req.body.hasOwnProperty('idNote'))
        return response.error(res, errors[0]);

    let note = {
        idUser : req.params.idUser,
        idNote : req.body.idNote
    };

    try{
        let result = await store.deleteNote(note);

        if (result === 0){
            response.success(res, '', 404);
        }else{
            response.success(res, '', 200);
        }


    }catch (e) {
        debug(e);
    }

});

router.patch('/:idUser/removeTag' , async (req,res) => {
    if (!req.body.hasOwnProperty('id_note') ||
        !req.body.hasOwnProperty('text_tag') )
        return response.error(res, errors[0]);

    let note = {
        id_user : req.params.idUser,
        id_note : req.body.id_note,
        text_tag : req.body.text_tag
    };
    try {
        let result = await store.deleteTagFromNote(note);

        // remove unnecessary properties
        delete result.text_tag;
        delete result.id_user;
        response.success(res, result);
    }catch (e) {
        debug(e);
    }
});

router.patch('/', async (req, res ) =>{
    if (!req.body.hasOwnProperty('id_user') ||
        !req.body.hasOwnProperty('id_note') ||
        !req.body.hasOwnProperty('title') ||
        !req.body.hasOwnProperty('description') )
        return response.error(res, errors[0]);

    let note = {
        idUser : req.body.id_user,
        idNote : req.body.id_note,
        title : req.body.title,
        description : req.body.description,
    };

    let result = await store.updateNote(note);
    response.success(res, '');
});


module.exports = router;