var validator = require('validator');

function saveJob(req, res){
    var job = {
        "compName": req.query.compName,
        "compMail": req.query.compMail,
        "compWeb": req.query.compWeb,
        "expireDate": req.query.expireDate,
        "deletePassword": req.query.deletePassword,
        "jobTittle": req.query.jobTittle,
        "jobType": req.query.jobType,
        "remote": req.query.remote,
        "jobLocation": req.query.jobLocation,
        "jobDesc": req.query.jobDesc
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