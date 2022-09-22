import app from '../app';
import request from 'supertest';
import { expect } from 'chai';
import { UserDB, UserZod } from '../models/User';

describe('Route => Auth', function(){
    let userToken: string;
    describe('GET /auth/:login', function() {
        const userToLogin = UserDB.find(user => user._id === '1')
        let response: request.Response;
    it('responds with json', async function() {
        response = await request(app)
        .post(`/auth/login`)
        .send({ _id: userToLogin?._id, password: userToLogin?._id })
            .set('Accept', 'application/json')
            expect(response.status).to.equal(200);
        });
        it(`response is valid and matches userId: ${userToLogin?._id}`, function() {
            const {token} = response.body as {token: string};
            expect(token && token?.length > 16).to.equal(true);
            userToken = token;
        });
    });

    describe('GET /auth/me', function() {
        it('responds with json when logged with jwt', function(done) {
            request(app)
            .get(`/auth/me`)
            .set('Accept', 'application/json')
            .set('authorization', userToken)
            .expect(200, done);
        });

        it('responds with 401 when not logged with jwt', function(done) {
            request(app)
            .get(`/auth/me`)
            .set('Accept', 'application/json')
            .expect(401, done);
        });
    });
})