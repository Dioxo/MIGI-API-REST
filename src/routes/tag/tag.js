const express = require('express');
const router = express.Router();
const response = require('../../response');
const errors = require('../../errors');
const store = require('./store');

/**
 * @function GET /api/tags/:idUser
 * @description return an array of tags from user with idUser
 */
router.get('/:idUser', async (req, res) => {
    let result = await store.getTags(req.params.idUser);
    response.success(res, result);
});

/**
 * @function GET /api/tags/:idUser/text?textTag
 * @description return the id of a tag based on its text
 * Params to send in the request's query:
 * textTag
 */
router.get('/:idUser/text', async (req, res) =>{
    if (!req.query.hasOwnProperty('textTag')){
        return response.error(res, errors[0]);
    }

    let userData = {
        idUser : req.params.idUser,
        textTag : req.query.textTag
    };

    let tag = await store.getTag(userData);
    response.success(res, tag);
});


/**
 * @function Get /api/tags/:idUser/countTags
 * @description return the number of notes that associates a tag
 */
router.get('/:idUser/countTags', async (req, res) =>{
    let tagsUses = await store.countTags(req.params.idUser);
    response.success(res, tagsUses);
});

/**
 * @function Post /api/tags/?idUser,textTag,colorTag
 * @description  Create a new tag when the query is well based
 * Params to send in the request's body:
 * idUser, textTag, colorTag
 */
router.post('/', async (req, res) => {
    if ( ! (req.body.hasOwnProperty('idUser'))  ||
        ! (req.body.hasOwnProperty('textTag')) ||
        ! (req.body.hasOwnProperty('colorTag')) ){
        return response.error(res, errors[0]);
    }

    const tag = {
        idUser : req.body.idUser,
        textTag : req.body.textTag,
        colorTag : req.body.colorTag
    };

    let result = await store.createTag(tag);

    response.success(res, result)

});

/**
 * @function PUT /api/tags/:idUser/:idNote?textTag
 * @description Add tag to note
 * Params to send in the request's body:
 * textTag
 */
router.put('/:idUser/:idNote', async (req, res) =>{
    if ( !(req.body.hasOwnProperty('textTag')) )
        return response.error(res, errors[0]);

    const info = {
        idUser : req.params.idUser,
        idNote : req.params.idNote,
        textTag : req.body.textTag
    };
    await store.addTagToNote(info);
    response.success(res, '');
});

/**
 * Router that handles tag's actions
 * @module tag
 * @type {Router}
 */
module.exports = router;