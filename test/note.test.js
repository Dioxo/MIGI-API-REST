const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');



describe('Note API TEST ', () => {

    it('GET /api/notes?idUser get all notes from a user' , async () => {
        const response = await request(server).get('/api/notes?idUser=0');

        expect(response.status).to.equal(200);

        const body = response.body.body; // the actual response's body
        expect(body).to.be.an.instanceOf(Array);

        let note = body[0];

        expect(note).to.be.an.instanceOf(Object);
        expect(note).to.have.property('id_note');
        expect(note).to.have.property('title');
        expect(note).to.have.property('description');
    });


});