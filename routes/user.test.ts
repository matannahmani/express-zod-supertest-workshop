import app from '../app';
import request from 'supertest';
import { expect } from 'chai';
import { UserDB, UserZod } from '../models/User';

describe('GET /user/:id', function() {
    const userToFind = UserDB.find(user => user._id === '1');
    const invalidUser = '-1';
    let response: request.Response;
    it('responds with json', async function() {
      response = await request(app)
        .get(`/user/${userToFind!._id}`)
        .set('Accept', 'application/json')
        expect(response.status).to.equal(200);
    });
    it(`response is valid and matches userId: ${userToFind?._id}`, function() {
        const user = UserZod.parse(response.body);
        expect(user._id).to.equal(userToFind?._id);
    });
    it(`should return 404 for invalid user: ${invalidUser}`, async function() {
        response = await request(app)
        .get(`/user/${invalidUser}`)
        .set('Accept', 'application/json')
        expect(response.status).to.equal(404);
    });
});