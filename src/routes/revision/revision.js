const express = require('express');
const router = express.Router();

const response = require('../../response');
const store = require('./store');

router.put('/:idUser',  async (req,res ) => {

    let info = {
        idUser : req.params.idUser,
        idNote : req.body.idNote,
        q : req.body.q
    };

    await store.addRevision(info);
    response.success(res, '');

});


router.get('/:idUser/today',async (req,res) => {
    let notes = await store.getTodayRevisionNotes(req.params.idUser);
    response.success(res, notes);
});

module.exports = router;