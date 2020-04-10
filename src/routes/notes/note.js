const express = require('express');
const router = express.Router();

const response = require('../../response');
const errors = require('../../errors');
const store = require('./store');
const debug =require('debug')('server:debug');

/**
 * @function GET /api/note/:idUser
 * @description Get all notes from user by idUser </br>
 * Params to send in the request's query:
 * title, description </br>
 * If title and description are passed on, see next router
 */
router.get('/:idUser' , async (req, res, next) => {

    if (req.query.hasOwnProperty('title') &&
        req.query.hasOwnProperty('description')){
        //if these parameters are send, pass to next handler to get idNote
        return next();
    }

    try {
        let result = await store.getNotes(req.params.idUser);
        response.success(res, result);
    }catch (err) {
        debug(err);
    }

});

/**
 * @function GET /api/note/:idUser?title,description
 * @description Get idNote based on title and description
 * Params to send in the request's query:
 * title,description
 * */
router.get('/:idUser' , async (req, res) => {
    let note = {
        idUser : req.params.idUser,
        title : req.query.title,
        description : req.query.description,
    };

    let idNote = await store.getIdNote(note);
    response.success(res,idNote[0]);
});

/**
 * @function POST /api/notes/:idUser
 * @description Create a Note
 * Params to send in the request's body:
 * description, title
 * */
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


/**
 * @function DELETE /api/note/:idUser?idNote
 * @description Delete Note
 * Params to send in the request's body:
 * idNote
 * */
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
        response.error(res, '',404);
    }

});

/**
 * @function PATCH /api/notes/:idUser?id_note,text_tag
 * @description Delete tag from note
 * Params to send in the request's body:
 * id_note, text_tag
 * */
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

/**
 * @function PATCH /api/note/:idUser?
 * @description Update note
 * Params to send in the request's body:
 * id_note, title, description
 * */
router.patch('/:idUser', async (req, res ) =>{
    if (!req.body.hasOwnProperty('id_note') ||
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
    response.success(res, result);
});

/**
 * @function GET /api/note/:idUser/tags
 * @description Get all notes that contains a certain tag
 * Params to send in the request's query:
 * textTag
 * */
router.get('/:idUser/tags',  async (req, res) =>{
    if (!req.query.hasOwnProperty('textTag') )
        return response.error(res, errors[0]);

    const args = {
      idUser : req.params.idUser,
      textTag : req.query.textTag,
    };
    const notes =  await store.getNotesBasedOn( args );

    response.success(res, notes);
});

/**
 * Router that handles all note's actions
 * @module note
 * @type {Router}
 */
module.exports = router;