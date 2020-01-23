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

    /**
     *
     * @param length   - Size of the string to generate randomly
     * @returns {string}
     */

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    it('Post /api/tags - Create a new tag when the query is well based' , async () => {
        const tag = {
            idUser : 0,
            textTag : makeid(15),
            colorTag : 'F4F4F4'
        };

        const response = await request(server).post('/api/tags').send(tag);
        expect(response.status).to.equal(200);

        expect(response.body.body).to.be.an.instanceOf(Object);
        expect(response.body.body).has.property('idTag');
        expect(response.body.body).has.property('textTag');
        expect(response.body.body).has.property('colorTag');
    });

});


