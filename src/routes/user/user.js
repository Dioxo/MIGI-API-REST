const debug =require('debug')('server:debug');
const errors = require('../../errors');
const response = require('../../response');
const express = require('express');
const store = require('./store');

const router = express.Router();
router.get('/', async (req,res) => {
    if (!req.query.hasOwnProperty('id_user'))
        return response.error(res, errors[0]);

    try{
        let idUser = req.query.id_user;
        const result = await store.getCredentials_NavDrawe(idUser);

        response.success(res, result);
    }catch (e) {
        debug(e);
    }
});

module.exports = router;