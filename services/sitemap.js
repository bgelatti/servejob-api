/*jslint node:true, unparam:true, nomen:true*/
var sm = require('sitemap');
var staticsitemap = require('../symbols/sitemap.json');

function get(req, res) {
    var filter;

    filter = {
        '_id': 0,
        'permalink': 1
    };

    DB.collection('jobs').find({}, filter).toArray(function (err, data){
        var sitelist = [];
        for (var i in data) {
            var obj = {
                'url': '/job/' + data[i].permalink + '/',
                'changefreq': 'daily',
                'priority': 0.3
            }
            sitelist.push(obj);
        }
        sitelist = sitelist.concat(staticsitemap);
        sitemap = sm.createSitemap({
            'hostname': 'http://servejob.com',
            'cacheTime': 600000,
            'urls': sitelist
        });
        sitemap.toXML( function (xml) {
            res.header('Content-Type', 'application/xml');
            res.send( xml );
        });
    });
}

exports.get = get;