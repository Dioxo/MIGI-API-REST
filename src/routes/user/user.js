const debug =require('debug')('server:debug');
const errors = require('../../errors');
const response = require('../../response');
const express = require('express');
const store = require('./store');

const router = express.Router();

/**
 * @function GET /api/user/:idUser
 * @description Get user's credentials
 */
router.get('/:idUser', async (req,res) => {
    try{
        let idUser = req.params.idUser;
        const result = await store.getCredentials_NavDrawe(idUser);

        response.success(res, result);
    }catch (e) {
        debug(e);
    }
});

/**
 * Router that handles user's actions
 * @module user
 * @type {Router}
 */
module.exports = router;