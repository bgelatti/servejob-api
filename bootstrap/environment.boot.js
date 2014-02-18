/*jslint node: true*/
/*global GLOBAL*/
'use strict';

module.exports = function () {
    GLOBAL.SERVICES = require('../services/');
    // GLOBAL.INFRA    = require('../infrastructure/');
    // GLOBAL.HELPERS  = require('../helpers/');
    GLOBAL.CONFIG   = require('../configuration.js');
};
