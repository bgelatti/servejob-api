/*jslint node: true*/
/*globals GLOBAL*/
'use strict';

var mongo = require('mongodb').MongoClient;
var conf  = require('../configuration.js');

module.exports = function () {
    var mongoconf = {
        "server": {
            "socketOptions": {
                "keepAlive": 1
            }
        }
    };

    mongo.connect(conf.connectionString, mongoconf, function (err, db) {
        GLOBAL.DB = db;
        if (err) { console.error(err); }
    });
};
