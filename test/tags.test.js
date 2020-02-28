const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');
const Utils = require('./Utils');

describe('Tags API TEST', () =>{

    it('GET /api/tags?idUser return an array of tags from user with idUser = 0', async function () {
        const response= await request(server).get('/api/tags/0');
        expect(response.status).to.equal(200);

        /**
         * @property {Array} response.body.body        - Contains the actual Array from the query
         * */
        const res = response.body.body;
        expect(res).to.be.an.instanceOf(Array);
        expect(res[0]).to.have.property('id_user', 0);
    });

    it('Post /api/tags - Create a new tag when the query is well based' , async () => {
        const tag = {
            idUser : 0,
            textTag : Utils.makeid(15),
            colorTag : 'F4F4F4'
        };

        const response = await request(server).post('/api/tags').send(tag);
        expect(response.status).to.equal(200);

        expect(response.body.body).to.be.an.instanceOf(Object);
        expect(response.body.body).has.property('idTag');
        expect(response.body.body).has.property('textTag');
        expect(response.body.body).has.property('colorTag');
    });

    it('Get /api/tags/:idUser/text?textTag return the id of a tag based on its text  ', async() =>{

        const response = await request(server).get('/api/tags/0/text?textTag=xgxOduSO6dvQDqK');

        expect(response.status).to.equal(200);

        const tag = response.body.body;

        expect(tag).to.be.an.instanceOf(Object);
        expect(tag[0].id_tag).to.equal(24);
    });

    it('Get /api/tags/:idUser/text?textTag QUERY IS NOT WELL FORMED ', async() =>{

        const response = await request(server).get('/api/tags/0/text');

        expect(response.status).to.equal(500);
    });

    it('Get /api/tags/:idUser/countTags return the number of notes that associates a tag' , async () =>{
       const response = await request(server).get('/api/tags/0/countTags');

       expect(response.status).to.equal(200);

       let tagsUses = response.body.body;

       expect(tagsUses).to.be.an.instanceOf(Array);

       expect(tagsUses[0]).to.have.all.keys('text_tag','count_tag');
    });

    it('PUT /api/tags/:idUser/:idNote?textTag | Add tag to note',async  function () {
        const response = await request(server)
                                            .put('/api/tags/0/1')
                                            .send({
                                                textTag : Utils.makeid(10)
                                                });

        expect(response.status).to.equal(200);

        expect(response.body.error).to.equal('');
        expect(response.body.body).to.equal('');
    });

});


