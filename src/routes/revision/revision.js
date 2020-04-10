const express = require('express');
const router = express.Router();

const response = require('../../response');
const store = require('./store');
const errors = require('../../errors');

/**
 * @function PUT /api/revision/:idUser
 * @description Create a revision
 * Params to send in the request's body:
 * idNote, q
 */
router.put('/:idUser',  async (req,res ) => {
    if (!req.body.hasOwnProperty('idNote') ||
        !req.body.hasOwnProperty('q') )
        return response.error(res, errors[0]);

    let info = {
        idUser : req.params.idUser,
        idNote : req.body.idNote,
        q : req.body.q
    };

    try {
        await store.addRevision(info);
        response.success(res, '');
    }catch (e) {
        response.error(res, '');
    }

});

/**
 * @function GET /api/revision/:idUser/today
 * @description Get notes to review today
 */
router.get('/:idUser/today',async (req,res) => {
    let notes = await store.getTodayRevisionNotes(req.params.idUser);
    response.success(res, notes);
});

/**
 * Router that handles revision's actions
 * @module revision
 * @type {Router}
 */
module.exports = router;