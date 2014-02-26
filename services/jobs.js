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
function validate(job) {
    var errors = [];
    if (!validator.isEmail(job.compMail)) {
        errors.push("Mail invalid");
    }

    return errors;
}

function saveJob(req, res){
    var job, returnmsg;
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

    if (validate(job).length > 0) {
        returnmsg = {
            "status": false,
            "message": errors
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