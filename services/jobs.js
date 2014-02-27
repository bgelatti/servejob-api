var validator = require('validator');
/*
{
    "status": true,
    "message": "Job saved."
    ...
}
{
    "status": false,
    "message": ["Mail invalid", "Need a title for job"]
}
*/
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

    return errors;
}

function saveJob(req, res){
    var job, returnmsg, err = [];
    job = {
        "compName": req.body.compName,
        "compMail": req.body.compMail,
        "compWeb": req.body.compWeb,
        "expireDate": req.body.expireDate,
        "deletePassword": req.body.deletePassword,
        "jobTitle": req.body.jobTitle,
        "jobType": req.body.jobType,
        "jobLocation": req.body.jobLocation,
        "jobDesc": req.body.jobDesc,
        "created_on": new Date()
    }

    err = isJobValid(job);

    if (err.length > 0) {
        returnmsg = {
            "status": false,
            "message": err
        };
        res.send(returnmsg)
        return;
    }

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
};

function getAllJobs(req, res){
    var filter = {};

    if (req.query.model === "full") {
        filter = {
            "_id": 0,
            "deletePassword": 0,
            "expireDate": 0
        };
    } else {
        filter = {
            "compName": 1,
            "jobTitle": 1,
            "jobType": 1,
            "jobLocation": 1,
            "_id": 0
        };
    }

    var collection = DB.collection('jobs').find({}, filter).toArray(function(err, data) {
        var returnmsg;

        if (err) {
            returnmsg = {
                "status": false,
                "message": [err]
            };
        } else {
            returnmsg = {
                "status": true,
                "result": data
            };
        }

        res.send(returnmsg);
    });
}


exports.saveJob = saveJob;
exports.getAllJobs = getAllJobs;