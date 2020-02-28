const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');

describe('revision Suit' , () =>{

    it('PUT /api/revision/:idUser | Create a revision', async function () {
        const response = await request(server)
                                            .put('/api/revisions/0/')
                                            .send({
                                                idNote : 1,
                                                q : 5
                                            });

        expect(response.body.body).to.equal('');
        expect(response.body.error).to.equal('');
    });


});