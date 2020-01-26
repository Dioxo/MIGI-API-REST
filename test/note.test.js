const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');
const Utils = require('./Utils');


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
        expect(note).to.have.property('tags');
        expect(note.tags).to.be.an.instanceOf(Array);

        const tags = note.tags[0];
        expect(tags).to.have.property('text_tag');
        expect(tags).to.have.property('color_tag');
    });

    it('GET /api/notes when no id specified' , async() => {
        const response = await request(server).get('/api/notes');

        expect(response.status).to.equal(500);

        expect(response.body.error).to.be.an.instanceOf(Object);
        expect(response.body.error).to.have.property('errorId');
        expect(response.body.error).to.have.property('message');

    });


    it('POST /api/notes?idUser,title,description - Create a Tag' , async () =>{
        const noteSend = {
            id_user : 0,
            title : Utils.makeid(50),
            description : Utils.makeid(10)
        };

        const response = await request(server).post('/api/notes').send(noteSend);

        expect(response.status).to.equal(200);
        const note = response.body.body;

        expect(note).to.have.property('id_note');
        expect(note).to.have.property('title');
        expect(note).to.have.property('description');
    });

    it('POST /api/notes - Create a Tag bad-formed', async() => {
        const response = await request(server).post('/api/notes').send({});

        expect(response.status).to.equal(500);
        expect(response.body.error).to.be.an.instanceOf(Object);
        expect(response.body.error).has.property('message');
        expect(response.body.error).has.property('errorId');
        expect(response.body.error.errorId).to.equal(0);
    });


    it('DELETE /api/notes | idUser, idNote -DELETE NOTE WHEN idNote doesn\'t exist' , async() =>{
        const response = await request(server)
                                .delete('/api/notes')
                                .send({
                                    idUser : 0,
                                    idNote : -1
                                });

        expect(response.status).to.equal(404);
    });


});