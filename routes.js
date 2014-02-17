var services = require('./services');

function routes(server) {
    server.get('/', function (req, res) {
        res.send("Ok");
    });

    server.get('/clients/getall', services.clients.getall);
}

module.exports = routes;