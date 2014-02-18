function routes(server) {
    server.get('/', function (req, res) {
        res.send("Ok");
    });

    server.get('/clients/getall', SERVICES.clients.getall);
}

module.exports = routes;