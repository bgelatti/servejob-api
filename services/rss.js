var Feed = require('feed');

function getAllFeed(req, res) {
    var filter = {
        "compName": 1,
        "jobTitle": 1,
        "jobType": 1,
        "created_on": 1,
        "permalink": 1,
        "jobDesc": 1,
        "_id": 0
    };

    DB.collection('jobs').find({}, filter).limit(10).sort({"created_on": -1}).toArray(function(err, data) {
        if (err) {
            var returnmsg = {
                "status": false,
                "message": [err]
            };

            res.send(returnmsg);
            return;
        }

        var jobs = data;

        var feed = new Feed({
            "title":       'ServeJob',
            "description": 'If you are seeking employment, their place here. No registration, no hassles, no ad, simple and objective.',
            "link":        'http://www.servejob.com',
            "image":       'http://www.servejob.com/img/logo.png',
            "copyright":   'All rights reserved',

            "author": {
                "name":    'ServeJob',
                "email":   'contact@servejob.com',
                "link":    'http://www.servejob.com'
            }
        });

        for(var key in jobs) {
            feed.addItem({
                "title":          (jobs[key].jobType + ' | ' + jobs[key].jobTitle + ' | ' + jobs[key].compName),
                "link":           ('http://www.servejob.com/#!/job/' + jobs[key].permalink),
                "description":    jobs[key].jobDesc,
                "date":           jobs[key].created_on
            });
        }

        feed.addCategory('Technology');
        feed.addCategory('Jobs');
        res.header('Content-Type', 'text/xml; charset=utf-8');
        console.log(feed.render('rss-2.0'));
        res.send(feed.render('rss-2.0'));
    });


};

exports.getAllFeed = getAllFeed;