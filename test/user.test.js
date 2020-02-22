const {expect} = require('chai');
const server = require('../src/app');
const {describe} = require("mocha");
const request = require('supertest');
const Utils = require('./Utils');


describe('USER API TEST ', () => {

    it('Get credentials from user to Nav Drawer', async function () {
        const response =await request(server).get('/api/users?id_user=0');

        expect(response.status).to.equal(200);

        const user = response.body.body;

        expect(user).to.have.property('email');
        expect(user).to.have.property('nickname');
    });


});
