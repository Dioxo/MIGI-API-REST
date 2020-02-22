const express = require('express');
const router = express.Router();
const response = require('../../response');
const errors = require('../../errors');
const store = require('./store');


router.get('/', async (req, res, next) => {
    /*If there's no idUser in the query */
    if (!req.query.idUser){
        return response.error(res, errors[0]);
    }

    let result = await store.getTags(req.query.idUser);

    response.success(res, result);
});

router.get('/:idUser', async (req, res) =>{
    let userData = {
        idUser : req.params.idUser,
        textTag : req.query.textTag
    };

    let tag = await store.getTag(userData);
    response.success(res, tag);
});

router.get('/:idUser/countTags', async (req, res) =>{
    let tagsUses = await store.countTags(req.params.idUser);
    response.success(res, tagsUses);
});

router.post('/', async (req, res, next) => {
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

module.exports = router;