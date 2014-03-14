/*jslint node:true*/
'use strict';

var format  = require('util').format;
var env     = process.env;
var configs = {
    "port"                  : env.PORT         || 7050,
    "allow_origin"          : env.ALLOW_ORIGIN || '*',
    "connectionString"      : env.DB           || 'mongodb://localhost/servejob',
    "connectionString_test" : env.DB_TEST      || 'mongodb://localhost/servejob-test',
    "newrelic"              : env.NEWRELIC     || false
};

// if (process.env.WERCKER_MONGODB_HOST) {
//     var model, connectionString;
//
//     model = 'mongodb://%s:%s/servejob-test';
//     connectionString = format(model, env.WERCKER_MONGODB_HOST, env.WERCKER_MONGODB_PORT);
//     configs.connectionString_test = connectionString;
// }

module.exports = configs;
