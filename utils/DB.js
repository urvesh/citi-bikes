'use strict';

const request = require('request');

const CITIBIKE_URL='https://feeds.citibikenyc.com/stations/stations.json';

class DB {
    async constructor() {
        this._data = [];

        await this._fetchData();
    }

    get stations() {
        return this._data;
    }

    _fetchData() {
        request({
            url: CITIBIKE_URL,
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (error) {
                console.log('error', error);
                throw error;
            }

            if (response.statusCode === 200) {
                this._data = body.stationBeanList;
            } else {
                console.log(new Error('Could not fetch citi bikes data'));
                this._data = [];
            }
        })
    }
}

module.exports = new DB();