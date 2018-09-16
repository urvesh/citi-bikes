'use strict';

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

const StationService = require('../services/StationService');

const PAGE_LENGTH = 20;

router.get('/', async (req, res, next) => {
    logger.log({
        level: 'info',
        message: `getting stations`,
        requestParameters: {
            arguments: {...req.query},
            path: req.baseUrl
        }
    });

    const page = req.query.page;  // string

    // if page is a non number or 0, bad request
    if (page && (isNaN(page) || page == 0)) {
        logger.log({
            level: 'error',
            message: 'invalid parameter page, must be a number greater than 0',
            requestParameters: {
                arguments: {...req.query},
                path: req.baseUrl
            }
        });
        return res.sendStatus(400);
    }

    let stations;

    try {
        stations = await StationService.getStations()
    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message,
            requestParameters: {
                arguments: {...req.query},
                path: req.baseUrl
            }
        });
        return res.sendStatus(500);
    }

    let min = 0;
    let max = stations.length;

    if (page) {
        min = (page - 1) * PAGE_LENGTH;
        max = (page * PAGE_LENGTH);
    }

    const results = stations
        .slice(min, max)
        .map(mapToSchema);

    res.json(results);
});

router.get('/in-service', async (req, res, next) => {
    logger.log({
        level: 'info',
        message: `getting stations that are in service`,
        requestParameters: {
            arguments: {...req.query},
            // path: req.originalUrl,
            path: `${req.baseUrl}${req.path}`
        }
    });

    const page = req.query.page;  // string

    // if page is a non number or 0, bad request
    if (page && isNaN(page) || page == 0) {
        logger.log({
            level: 'error',
            message: 'invalid parameter page, must be a number greater than 0',
            requestParameters: {
                arguments: {...req.query},
                path: `${req.baseUrl}${req.path}`
            }
        });
        return res.sendStatus(400);
    }

    let stations;

    try {
        stations = await StationService.getStations()
    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message,
            requestParameters: {
                arguments: {...req.query},
                path: req.baseUrl
            }
        });
        return res.sendStatus(500);
    }

    const filteredStations = stations.filter(station => {
        return station.statusValue === 'In Service';
    });

    let min = 0;
    let max = filteredStations.length;

    if (page) {
        min = (page - 1) * PAGE_LENGTH;
        max = (page * PAGE_LENGTH);
    }

    const results = filteredStations
        .slice(min, max)
        .map(mapToSchema);

    res.json(results);
});

router.get('/not-in-service', async (req, res, next) => {
    logger.log({
        level: 'info',
        message: `getting stations that are not in service`,
        requestParameters: {
            arguments: {...req.query},
            path: `${req.baseUrl}${req.path}`
        }
    });

    const page = req.query.page;  // string

    // if page is a non number or 0, bad request
    if (page && isNaN(page) || page == 0) {
        logger.log({
            level: 'error',
            message: 'invalid parameter page, must be a number greater than 0',
            requestParameters: {
                arguments: {...req.query},
                path: `${req.baseUrl}${req.path}`
            }
        });
        return res.sendStatus(400);
    }

    let stations;

    try {
        stations = await StationService.getStations()
    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message,
            requestParameters: {
                arguments: {...req.query},
                path: `${req.baseUrl}${req.path}`
            }
        });
        return res.sendStatus(500);
    }

    const filteredStations = stations.filter(station => {
        return station.statusValue === 'Not In Service';
    });

    let min = 0;
    let max = filteredStations.length;

    if (page) {
        min = (page - 1) * PAGE_LENGTH;
        max = (page * PAGE_LENGTH);
    }

    const results = filteredStations
        .slice(min, max)
        .map(mapToSchema);

    res.json(results);
});

router.get('/:searchString', async (req, res, next) => {
    logger.log({
        level: 'info',
        message: `getting stations that match search criteria`,
        requestParameters: {
            arguments: {...req.params},
            path: `${req.baseUrl}/:searchString`
        }
    });

    let {searchString} = req.params;

    searchString = searchString.toLowerCase();

    let stations;

    try {
        stations = await StationService.getStations();
    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message,
            requestParameters: {
                arguments: {...req.params},
                path: `${req.baseUrl}:searchString`
            }
        });
        return res.sendStatus(500);
    }

    const results = stations
        .filter(station => {
            return (
                station.stationName.toLowerCase().includes(searchString) ||
                station.stAddress1.toLowerCase().includes(searchString)
            );
        })
        .map(mapToSchema);

    res.json(results);
});

module.exports = router;

const mapToSchema = (station) => {
    return {
        stationName: station.stationName,
        stAddress1: station.stAddress1,
        availableBikes: station.availableBikes,
        totalDocks: station.totalDocks
    }
};

// const sampleData = {
//     "id": 150,
//     "stationName": "E 2 St & Avenue C",
//     "availableDocks": 0,
//     "totalDocks": 29,
//     "latitude": 40.7208736,
//     "longitude": -73.98085795,
//     "statusValue": "In Service",
//     "statusKey": 1,
//     "availableBikes": 27,
//     "stAddress1": "E 2 St & Avenue C",
//     "stAddress2": "",
//     "city": "",
//     "postalCode": "",
//     "location": "",
//     "altitude": "",
//     "testStation": false,
//     "lastCommunicationTime": "2018-09-13 07:59:21 PM",
//     "landMark": ""
// }