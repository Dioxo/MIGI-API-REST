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

router.post('/', async (req, res, next) => {
    if (!req.query.idUser || !req.query.textTag || !req.query.colorTag){
        return response.error(res, errors[0]);
    }

    const tag = {
        idUser : req.query.idUser,
        textTag : req.query.textTag,
        colorTag : req.query.colorTag
    };

    let result = await store.createTag(tag);

    response.success(res, result)

});

module.exports = router;