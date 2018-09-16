'use strict';

const express = require('express');

const stationRoutes = require('./routes/stationRoutes');
const dockableRoutes = require('./routes/dockableRoutes');

const port = 4000;

const app = express();

app.use('/stations', stationRoutes);
app.use('/dockable', dockableRoutes);

app.listen(port, () => {
    console.log('Server started on port:', port);
});

module.exports = app;