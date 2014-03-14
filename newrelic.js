/*jslint node: true*/
'use strict';

var conf = require('./configuration.js');

exports.config = {
    /**
    * Array of application names.
    */
    app_name : ['servejob-server-api'],
    /**
    * Your New Relic license key.
    */
    license_key : '808f3be32842fea709464266d7416dfc3ab7c797',
    logging : {
        /**
        * Level at which to log. 'trace' is most useful to New Relic when diagnosing
        * issues with the agent, 'info' and higher will impose the least overhead on
        * production applications.
        */
        level : 'trace'
    }
};

exports.start = function start() {
    if (conf.newrelic === 'true') {
        require('newrelic');
    }
};
