/*jslint node:true, unparam:true, nomen:true*/
/*globals DB, INFRA*/
'use strict';

var _         = require('lodash');
var validator = require('validator');
var moment    = require('moment');
var async     = require('async');
var BSON      = require('mongodb').BSONPure;

function isJobValid(job) {
    var errors = [];
    if (validator.isNull(job.compName)) {
        errors.push("Company name invalid");
    }

    if (!validator.isEmail(job.compMail)) {
        errors.push("Mail invalid");
    }

    if (validator.isNull(job.compWeb)) {
        errors.push("WebSite invalid");
    }

    if (validator.isNull(job.expireDate)) {
        errors.push("Expire date invalid");
    }

    if (validator.isNull(job.deletePassword)) {
        errors.push("Delete password invalid");
    }

    if (validator.isNull(job.jobTitle)) {
        errors.push("Job title invalid");
    }

    if (validator.isNull(job.jobType)) {
        errors.push("Job type invalid");
    }

    if (validator.isNull(job.jobLocation)) {
        errors.push("Job location invalid");
    }

    if (validator.isNull(job.jobDesc)) {
        errors.push("Job description invalid");
    }

    if (validator.isNull(job.howToApply)) {
        errors.push("How to Apply is required");
    }

    return errors;
}

function normalizeHttp(url) {
    if (url.indexOf("http://") === 0) {
        return url.substring(7, url.length);
    }
    if (url.indexOf("https://") === 0) {
        return url.substring(8, url.length);
    }
    return url;
}

function permalinkGenerator(compName, jobTitle, callback) {
    var rawpermalink, permalink, query, filter;
    rawpermalink = compName + " " + jobTitle;
    permalink = INFRA.permalink(rawpermalink);
    query = {
        "permalink": permalink
    };
    filter = {
        "_id": 1
    };

    DB.collection('jobs').findOne(query, filter, function (err, data) {
        if (data) {
            permalinkGenerator(compName, jobTitle + " job", function (permalinkCall) {
                callback(permalinkCall);
            });
        } else {
            callback(permalink);
        }
    });
}

function saveJob(req, res) {
    var job, returnmsg, err = [];

    err = isJobValid(req.body);

    if (err.length > 0) {
        returnmsg = {
            "status": false,
            "message": err
        };
        res.send(returnmsg);
        return;
    }

    job = {
        "compName": req.body.compName,
        "compMail": req.body.compMail,
        "compWeb": normalizeHttp(req.body.compWeb),
        "expireDate": moment().add('M', req.body.expireDate)._d,
        "deletePassword": INFRA.cryptoPass(req.body.deletePassword),
        "jobTitle": req.body.jobTitle,
        "jobType": req.body.jobType,
        "jobLocation": req.body.jobLocation,
        "jobDesc": req.body.jobDesc,
        "created_on": new Date(),
        "howToApply": req.body.howToApply
    };

    permalinkGenerator(req.body.compName, req.body.jobTitle, function (permalink) {
        job.permalink = permalink;

        DB.collection('jobs').insert(job, function (err) {
            if (err) {
                returnmsg = {
                    "status": false,
                    "message": [err]
                };
            } else {
                returnmsg = {
                    "status": true,
                    "message": "New job saved with success."
                };
            }

            res.send(returnmsg);
        });
    });
}

function getAllJobs(req, res) {
    var filter = {}, sort, page, jobQty, skip,
        getJobsDB, getCountJobsDB;

    if (req.query.model === "full") {
        filter = {
            "deletePassword": 0,
            "expireDate": 0
        };
    } else {
        filter = {
            "compName": 1,
            "jobTitle": 1,
            "jobType": 1,
            "jobLocation": 1,
            "created_on": 1,
            "permalink": 1
        };
    }

    sort = {
        "created_on": -1
    };

    page = req.query.page || 1;
    jobQty = parseInt(req.query.jobQty || 10, 10);
    skip = (jobQty / (page - 1));
    if (isNaN(jobQty)) {
        jobQty = 10;
    }

    if (jobQty > 20) {
        jobQty = 10;
    }

    getJobsDB = function (callback) {
        DB.collection('jobs').find({}, filter).sort(sort).skip(skip).limit(jobQty).toArray(function (err, jobList) {
            callback(err, jobList);
        });
    };

    getCountJobsDB = function (callback) {
        DB.collection('jobs').find({}).count(function (err, jobQty) {
            callback(err, jobQty);
        });
    };

    async.parallel({ "getJobsDB": getJobsDB, "getCountJobsDB": getCountJobsDB }, function (err, result) {
        var returnmsg;

        if (err) {
            returnmsg = {
                "status": false,
                "message": [err]
            };
        } else {
            returnmsg = {
                "status": true,
                "result": {
                    "total_items": result.getCountJobsDB,
                    "total_pages": Math.ceil((result.getCountJobsDB / jobQty)),
                    "items": result.getJobsDB
                }
            };
        }

        res.send(returnmsg);
    });
}

function getById(req, res) {
    var filter, id, query;
    filter = {
        "deletePassword": 0,
        "expireDate": 0
    };

    try {
        id = BSON.ObjectID(req.params.id);
    } catch (ignore) {}

    query = {
        "_id": id
    };

    DB.collection('jobs').findOne(query, filter, function (err, data) {
        var returnmsg;

        if (err) {
            returnmsg = {
                "status": false,
                "message": [err]
            };
        }

        if (data) {
            returnmsg = {
                "status": true,
                "result": data
            };
        } else {
            returnmsg = {
                "status": false,
                "message": ["ID don't exists"]
            };
        }

        res.send(returnmsg);
    });
}

function getByPermalink(req, res) {
    var filter, query;
    filter = {
        "deletePassword": 0,
        "expireDate": 0
    };

    query = {
        "permalink": req.params.permalink
    };

    DB.collection('jobs').findOne(query, filter, function (err, data) {
        var returnmsg;

        if (err) {
            returnmsg = {
                "status": false,
                "message": [err]
            };
        }

        if (data) {
            returnmsg = {
                "status": true,
                "result": data
            };
        } else {
            returnmsg = {
                "status": false,
                "message": ["Permalink don't exists"]
            };
        }

        res.send(returnmsg);
    });
}

function deleteById(req, res) {
    var id, pass, query;

    try {
        id = BSON.ObjectID(req.params.id);
        pass = INFRA.cryptoPass(req.params.password);
    } catch (ignore) {}

    query = {
        "_id": id,
        "deletePassword": pass
    };

    DB.collection('jobs').remove(query, function (err, data) {
        var returnmsg;

        if (err) {
            returnmsg = {
                "status": false,
                "message": [err]
            };
        }

        if (data === 1) {
            returnmsg = {
                "status": true,
                "result": 'Deleted with success'
            };
        } else {
            returnmsg = {
                "status": false,
                "message": ["ID don't exists or password incorrect"]
            };
        }

        res.send(returnmsg);
    });
}

function searchJob(req, res) {
    var searchTerm, filter, query;
    searchTerm = req.params.term;

    filter = {
        "compName": 1,
        "jobTitle": 1,
        "jobType": 1,
        "jobLocation": 1,
        "created_on": 1,
        "permalink": 1
    };
    query = {
        "text": "jobs",
        "search": searchTerm,
        "project": filter,
        "limit": 100
    };

    DB.command(query, function (err, data) {
        var returnmsg;

        if (err) {
            returnmsg = {
                "status": false,
                "message": [err]
            };
        }

        if (data.results.length > 0) {
            returnmsg = {
                "status": true,
                "result": _.reduceRight(data.results, function (a, b) { return a.concat(b.obj); }, [])
            };
        } else {
            returnmsg = {
                "status": false,
                "message": ["Sorry, no results containing all your search terms were found."]
            };
        }

        res.send(returnmsg);
    });
}


exports.saveJob             = saveJob;
exports.getAllJobs          = getAllJobs;
exports.getById             = getById;
exports.deleteById          = deleteById;
exports.getByPermalink      = getByPermalink;
exports.searchJob           = searchJob;
exports._normalizeHttp      = normalizeHttp;
exports._permalinkGenerator = permalinkGenerator;