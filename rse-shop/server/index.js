require('express-async-errors');
const express = require('express');
const http = require('http');

const app = express();
app.enable('trust proxy');
const httpServer = http.createServer(app);

require('./start/logger')();
require('./start/config')();
require('./start/validation')();
require('./start/routes')(app);
require('./start/gqlServer')(app, httpServer);
require('./start')(httpServer);
