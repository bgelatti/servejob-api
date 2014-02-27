function routes(server) {
    server.options('*', INFRA.allowHeader.all);

    server.get('/', function (req, res) {
        res.send("Ok");
    });

    server.get('/clients/getall', SERVICES.clients.getall);
    server.post('/jobs/savejob', INFRA.allowHeader.post, SERVICES.jobs.saveJob);
    server.get('/jobs/getalljobs', INFRA.allowHeader.get, SERVICES.jobs.getAllJobs)
}

module.exports = routes;