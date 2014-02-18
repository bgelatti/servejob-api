var format  = require('util').format;
var env     = process.env;
var configs = {
    "port"                 : env.PORT_BACKEND      || 7050,
    "connectionString"     : env.ACCOUNTS_DB       || 'mongodb://localhost/servejob',
    "connectionString_test": env.ACCOUNTS_TEST     || 'mongodb://localhost/servejob-test'
};

if (process.env.WERCKER_MONGODB_HOST) {
    var model, connectionString;

    model = 'mongodb://%s:%s/servejob-test';
    connectionString = format(model, env.WERCKER_MONGODB_HOST, env.WERCKER_MONGODB_PORT);
    configs.connectionString_test = connectionString;
}

module.exports = configs;