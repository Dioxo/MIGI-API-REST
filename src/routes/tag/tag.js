const express = require('express');
const router = express.Router();
const response = require('../../response');
const errors = require('../../errors');
const controller = require('./controller');


router.get('/', async (req, res, next) => {
    /*If there's no idUser in the query */
    if (!req.query.idUser){
        return response.error(res, errors[0]);
    }

    let result = await controller.getTags(req.query.idUser);

    response.success(res, result, 200);
});


module.exports = router;