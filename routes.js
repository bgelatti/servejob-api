function routes(server) {
    server.options('*', INFRA.allowHeader.all);

    server.get('/', function (req, res) {
        res.send("Ok");
    });

    server.get('/clients/getall', SERVICES.clients.getall);
    server.post('/jobs/savejob', INFRA.allowHeader.post, SERVICES.jobs.saveJob);
    server.get('/jobs/getalljobs', SERVICES.jobs.getAllJobs)
}

module.exports = routes;