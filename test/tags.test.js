const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');

describe('Tags API TEST', () =>{

    it('GET /api/tags?idUser return an array of tags from user with idUser = 0', async function () {
        const response= await request(server).get('/api/tags/?idUser=0');
        expect(response.status).to.equal(200);

        /**
         * @property {Array} response.body.body        - Contains the actual Array from the query
         * */
        const res = response.body.body;
        expect(res).to.be.an.instanceOf(Array);
        expect(res).to.have.lengthOf(1);
        expect(res[0]).to.have.property('id_user', 0);
    });

    it('GET /api/tags, when no idUser specified return an error object, with errorId = 0 and a message', async function () {
        const response= await request(server).get('/api/tags/');
        expect(response.status).to.equal(500);
        expect(response.body.error).to.be.an.instanceOf(Object);
        expect(response.body.error).has.property('message');
        expect(response.body.error).has.property('errorId');
        expect(response.body.error.errorId).to.equal(0);
    });

    it('Post /api/tags?idUser&textTag&colorTag, Create a new tag when the query is well based' , async () => {
        const response = await request(server).post('/api/tags?idUser=0&textTag=TEST_TAG&colorTag=F4F4F4');
        expect(response.status).to.equal(200);

        expect(response.body.body).to.be.an.instanceOf(Object);
        expect(response.body.body).has.property('id_tag');
        expect(response.body.body).has.property('text_tag');
        expect(response.body.body).has.property('color_tag');
    })

});


