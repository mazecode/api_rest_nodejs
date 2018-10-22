"use strict"

const request = require('supertest');
// const expect = require('chai').expect;
const app = require('../app');

//==================== Clients API test ====================


describe('POST /api/v1/clients', () => {
    let data = {
        name: "dummy",
        surname: "dummy",
        email: "dummy@dummy.com"
    }
    it('respond with 201 created', done => {
        request(app)
            .post('/api/v1/clients')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(function (res) {
                res.body.statusText = 'Created';
            })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /api/v1/clients', () => {
    let data = {
        "id": "1",
        "name": "dummy",
        "surname": "dummy",
        "email": "dummy@dummy.com",
        "password": "dummypassword"
    }
    it('Respond with 400 not created', done => {
        request(app)
            .post('/api/v1/clients')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


describe('GET /api/v1/clients', () => {
    it('Respond with json containing a list of all clients', done => {
        request(app)
            .get('/api/v1/clients')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


describe('GET /api/v1/clients/:id', () => {
    it('Respond with json containing a single client', done => {
        request(app)
            .get('/api/v1/clients/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/v1/clients/:id', () => {
    it('respond with json client not found', (done) => {
        request(app)
            .get('/api/v1/clients/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) 
            .expect(function (res) {
                res.body.statusText = 'Incorrect parameter value';
            })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

//==================== Phones API test ====================

describe('GET /api/v1/phones', () => {
    it('Respond with json containing a list of all phones', done => {
        request(app)
            .get('/api/v1/phones')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/v1/phones/:id', () => {
    it('Respond with json containing a single phone', done => {
        request(app)
            .get('/api/v1/phones/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/v1/phones/:id', () => {
    it('respond with json phone not found', done => {
        request(app)
            .get('/api/v1/phones/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) 
            .expect(function (res) {
                res.body.statusText = 'Incorrect parameter value';
            })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

//==================== Order API test ====================

describe('POST /api/v1/orders', () => {
    let data = {
        name: "dummy",
        surname: "dummy",
        email: "dummy@dummy.com",
        phones: "1,2"        
    }
    it('respond with 201 created', done => {
        request(app)
            .post('/api/v1/orders')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
