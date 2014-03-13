function routes(server) {
    server.options('*', INFRA.allowHeader.all);

    server.get('/', function (req, res) {
        res.send("Ok");
    });

    server.get('/clients/getall', SERVICES.clients.getall);
    server.post('/jobs/savejob', INFRA.allowHeader.post, SERVICES.jobs.saveJob);
    server.get('/jobs/getalljobs', INFRA.allowHeader.get, SERVICES.jobs.getAllJobs);
    server.get('/jobs/getbyid/:id', INFRA.allowHeader.get, SERVICES.jobs.getById);
    server.get('/jobs/getbypermalink/:permalink', INFRA.allowHeader.get, SERVICES.jobs.getByPermalink);
    server.del('/jobs/delete/:password/:id', INFRA.allowHeader.del, SERVICES.jobs.deleteById);
    server.get('/jobs/search/:term', INFRA.allowHeader.get, SERVICES.jobs.searchJob);
    server.get('/rss', INFRA.allowHeader.get, SERVICES.rss.getAllFeed);
}

module.exports = routes;
