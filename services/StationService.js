'use strict';

const request = require('request');

const CITIBIKE_URL = 'https://feeds.citibikenyc.com/stations/stations.json';

class StationService {
    static async getStations() {
        return new Promise((resolve, reject) => {
            request({
                url: CITIBIKE_URL,
                method: 'GET',
                json: true
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                if (response.statusCode === 200) {
                    return resolve(body.stationBeanList);
                }

                return reject(new Error(`Status Code: ${response.statusCode} - Could not fetch citibike stations`));
            })
        })
    }
}

module.exports = StationService ;