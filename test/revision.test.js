const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');

describe('revision Suit' , () =>{

    it('GET /api/revision/', async function () {
        const response = await request(server).get('/api/revisions/0?idNote=1&q=5');

        expect(response.body.body).to.equal('');
        expect(response.body.error).to.equal('');
    });


});