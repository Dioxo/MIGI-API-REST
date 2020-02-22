const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');
const Utils = require('./Utils');


describe('Note API TEST ', () => {

    it('GET /api/notes/:idUser get all notes from a user' , async () => {
        const response = await request(server).get('/api/notes/0');

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


    it('POST /api/notes/:idUser?title,description - Create a Tag' , async () =>{
        const noteSend = {
            title : Utils.makeid(50),
            description : Utils.makeid(10)
        };

        const response = await request(server).post('/api/notes/0').send(noteSend);

        expect(response.status).to.equal(200);
        const note = response.body.body;

        expect(note).to.have.property('id_note');
        expect(note).to.have.property('title');
        expect(note).to.have.property('description');
    });

    it('POST /api/notes/:idUser - Create a Tag bad-formed', async() => {
        const response = await request(server).post('/api/notes/0').send({});

        expect(response.status).to.equal(500);
        expect(response.body.error).to.be.an.instanceOf(Object);
        expect(response.body.error).has.property('message');
        expect(response.body.error).has.property('errorId');
        expect(response.body.error.errorId).to.equal(0);
    });

    it('PATCH /api/notes/:idUser | Delete tag from note' , async  () =>{
        const response = await request(server).
        patch('/api/notes/0/removeTag')
            .send({
                id_note : 1,
                text_tag : 'test tag example'
            });

        expect(response.status).to.equal(200);

        const note = response.body.body;

        expect(note).to.be.an.instanceOf(Object);
        expect(note).to.have.property('id_note');
        expect(note).to.have.property('tags');
        expect(note.tags).to.be.an.instanceOf(Array);

        if (note.tags.length > 0 ){
            const tag = note.tags[0];

            expect(tag).to.have.property('text_tag');
            expect(tag).to.have.property('color_tag');
        }
    });

    it('DELETE /api/notes/:idUser | DELETE NOTE ' , async() =>{
        // This function could generate problems if idNote doesn't exists...
        // If test fails, see if idNote 1 still exists
        const response = await request(server)
            .delete('/api/notes/0')
            .send({
                idNote : 0
            });

        expect(response.status).to.equal(200);
    });
    it('DELETE /api/notes/:idUser | idUser, idNote -DELETE NOTE WHEN idNote doesn\'t exist' , async() =>{
        const response = await request(server)
            .delete('/api/notes')
            .send({
                idUser : 0,
                idNote : -1
            });

        expect(response.status).to.equal(404);
    });

    it('DELETE /api/notes:idUser | DELETE NOTE but not all arguments were given' , async() =>{
        const response = await request(server)
            .delete('/api/notes/0')
            .send();

        expect(response.status).to.equal(500);
    });

    it('PATCH update note', async ()=>{
        const response = await request(server)
                                .patch('/api/notes')
                                .send({
                                    id_user : 0,
                                    id_note : 1,
                                    title : Utils.makeid(10),
                                    description : Utils.makeid(50),
                                });

        expect(response.status).to.equal(200);
    });


});