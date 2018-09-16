'use strict';

const express = require('express');
const router = express.Router();

const logger = require('../utils/logger');
const StationService = require('../services/StationService');

router.get('/:stationId/:bikesToReturn', async (req, res, next) => {
    logger.log({
        level: 'info',
        message: `checking if a station is dockable`,
        requestParameters: {
            arguments: {...req.params},
            path: `${req.baseUrl}/:stationId/:bikesToReturn`
        }
    });

    const {stationId, bikesToReturn} = req.params;

    if (isNaN(stationId) || isNaN(bikesToReturn)) {
        logger.log({
            level: 'error',
            message: 'invalid parameters, must be numbers',
            requestParameters: {
                arguments: {...req.params},
                path: `${req.baseUrl}/:stationId/:bikesToReturn`            }
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
                arguments: {...req.params},
                path: `${req.baseUrl}/:stationId/:bikesToReturn`
            }
        });
        return res.sendStatus(500);
    }

    const station = stations.find(station => {
        // stationId is a string, station.id is a number
        return stationId == station.id;
    });

    if (!station) {
        logger.log({
            level: 'error',
            message: 'station not found',
            requestParameters: {
                arguments: {...req.params},
                path: `${req.baseUrl}/:stationId/:bikesToReturn`
            }
        });
        return res.sendStatus(404);
    }

    if (station.availableDocks >= bikesToReturn) {
        return res.json({
            dockable: true,
            message: 'this station has available docks for you to return your bike(s)'
        })
    }

    return res.json({
        dockable: false,
        message: 'this station does not have enough available docks for you to return your bike(s)'
    });
});

module.exports = router;