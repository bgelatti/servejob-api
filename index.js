/*jslint node:true*/
/*globals CONFIG*/
'use strict';

/**
 * Module dependencies.
 */
var express    = require('express');
var bodyParser = require('body-parser');
var format     = require('util').format;
var boot       = require('./bootstrap/');
var routes     = require('./routes.js');
var server     = express();

/**
 * Init third-party services
 */
boot.mongo();
boot.environment();
boot.newrelic();

/**
 * Express Configuration.
 */
server.set('port', CONFIG.port);
server.use(bodyParser());

/**
 * Routes Configuration.
 */
routes(server);

/**
 * Start Server.
 */
server.listen(server.get('port'), function () {
    var msg = '';
    msg += '\n- \u001b[31mServeJob - API';
    msg += '\u001b[31m at \u001b[0m';
    msg += 'http://localhost:%s\u001b[0m';
    msg = format(msg, server.get('port'));
    console.info(msg);
});
