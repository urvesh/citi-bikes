'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const StationService = require('../services/StationService');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Station Routes', () => {
    it('should get all stations /stations', done => {
        chai.request(server)
            .get('/stations')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.greaterThan(0);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                done();
            });
    });

    it('should get all stations with paging /stations?page=1', done => {
        chai.request(server)
            .get('/stations?page=1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.equal(20);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                done();
            });
    });

    it('should get stations that are in service /stations/in-service', done => {
        chai.request(server)
            .get('/stations/in-service')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.greaterThan(0);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                done();
            });
    });

    it('should get stations that are in service with paging /stations/in-service?page=1', done => {
        chai.request(server)
            .get('/stations/in-service?page=1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.equal(20);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                done();
            });
    });

    it('should get stations that are not in service /stations/not-in-service', done => {
        chai.request(server)
            .get('/stations/not-in-service')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.greaterThan(0);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                done();
            });
    });

    it('should get stations that are not in service with paging /stations/not-in-service?page=1', done => {
        chai.request(server)
            .get('/stations/not-in-service?page=1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.equal(20);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                done();
            });
    });

    it('should get stations that match search string /stations/:searchString', done => {
        chai.request(server)
            .get('/stations/wythe')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.greaterThan(0);
                expect(res.body[0]).to.be.a('object');
                expect(res.body[0]).to.have.property('stationName');
                expect(res.body[0]).to.have.property('stAddress1');
                expect(res.body[0]).to.have.property('availableBikes');
                expect(res.body[0]).to.have.property('totalDocks');
                expect(res.body[0].stationName.toLowerCase()).to.include('wythe');
                expect(res.body[0].stAddress1.toLowerCase()).to.include('wythe');
                done();
            });
    });
});

describe('Dockable Routes', () => {
    it('should return if a station id has a number of available docks /dockable/:stationId/:bikesToReturn', done => {
        chai.request(server)
            .get('/dockable/281/1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.a('object');
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('dockable');
                expect(res.body.dockable).to.be.a('boolean');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                done();
            })
    })
});

describe('Station Service', () => {
    it('should return a list of bikes', (done) => {
        expect(StationService).to.not.be.null;
        expect(StationService).to.have.property('getStations');
        expect(StationService.getStations).to.be.a('function');
        done();
    })
});
