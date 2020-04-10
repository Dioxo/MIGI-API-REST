const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');

describe('revision Suit' , () =>{

    it('PUT /api/revision/:idUser | Create a revision', async function () {
        const response = await request(server)
                                            .put('/api/revisions/0/')
                                            .send({
                                                idNote : 3,
                                                q : 1
                                            });

        expect(response.body.body).to.equal('');
        expect(response.body.error).to.equal('');
    });

    it('GET /api/revisions/:idUser | get notes to review today', async function () {
        const response = await request(server).get('/api/revisions/0/today');

        expect(response.status).to.equal(200);

        const notes = response.body.body;
        expect(notes).to.be.an.instanceOf(Array);

        if (notes.length > 0 ){
            const note = notes[0];
            expect(note).to.have.all.keys('id_note','title', 'description','have_revision','tags');
        }

    });
});