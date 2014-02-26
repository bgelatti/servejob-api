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
        "jobDesc": req.body.jobDesc
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
    var collection = DB.collection('jobs').find({}).toArray(function(err, docs) {
        console.dir(docs);
    });
}


exports.saveJob = saveJob;
exports.getAllJobs = getAllJobs;