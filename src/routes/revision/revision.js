const express = require('express');
const router = express.Router();

const response = require('../../response');
const store = require('./store');

router.get('/:idUser',  async (req,res ) => {

    let info = {
        idUser : req.params.idUser,
        idNote : req.query.idNote,
        q : req.query.q
    };

    await store.addRevision(info);
    response.success(res, '');

});


module.exports = router;