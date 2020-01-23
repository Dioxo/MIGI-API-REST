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




module.exports = router;