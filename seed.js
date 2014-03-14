
/*jslint node:true*/
/*globals DB*/
'use strict';

var boot = require('./bootstrap/');
boot.mongo();

function start() {
    var indexSearchJobs = {
        "compName": "text",
        "jobTitle": "text",
        "jobType": "text",
        "jobLocation": "text",
        "jobDesc": "text"
    };

    DB.collection('jobs').ensureIndex(indexSearchJobs, {"name": "SearchIndex"}, function (err, result) {

        console.log("Index to full search: ", err || result);

    });

    DB.collection('jobs').ensureIndex({"expireDate": 1}, {"expireAfterSeconds": 0}, function (err, result) {

        console.log("Index to expire date: ", err || result);

    });
}

setTimeout(function () {
    start();
}, 1000);
