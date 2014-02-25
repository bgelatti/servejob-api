var validator = require('validator');

function saveJob(req, res){
    var job = {
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

    if (validator.isEmail(job.compMail)) {
        console.log('email valido');
    }

    if (validator.isDate(job.expireDate)){
        console.log('data valida');
    }

    DB.collection('jobs').insert(job, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('OK');
        }
    });
};

function getAllJobs(req, res){
    var collection = DB.collection('jobs').find({}).toArray(function(err, docs) {
        console.dir(docs);
    });
}


exports.saveJob = saveJob;
exports.getAllJobs = getAllJobs;