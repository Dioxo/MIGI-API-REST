const express = require('express');
const router = express.Router();

const response = require('../../response');
const store = require('./store');
const debug =require('debug')('server:debug');

router.get('/:idUser',  async (req,res ) => {

    let info = {
        idUser : req.params.idUser,
        idNote : req.query.idNote,
        q : req.query.q
    };

    try{
        await store.addRevision(info);
        response.success(res, '');
    }catch (e) {
        console.log(e);
        debug(e);
    }

});


module.exports = router;