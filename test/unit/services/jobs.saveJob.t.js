/*jslint node:true, unparam: true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');

function req_mock() {
    return {
        'body': {
            "compName": "CompName",
            "compMail": "compMail@test.com",
            "compWeb": "compWeb",
            "expireDate": 1,
            "deletePassword": "deletePassword",
            "jobTitle": "jobTitle",
            "jobType": "jobType",
            "jobLocation": "jobLocation",
            "jobDesc": "jobDesc",
            "created_on": new Date(),
            "howToApply": "howToApply"
        }
    };
}

suite('job.saveJob', function () {
    var saveJob;
    setup(function () {
        GLOBAL.INFRA = require('../../../infrastructure/');
        saveJob = require('../../../services/jobs.js').saveJob;
    });
    suite('errors', function () {
        test('Company name invalid', function () {
            var req, res;
            req = req_mock();
            req.body.compName = '';
            res = {
                'send': function (x) {
                    assert.equal('Company name invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Mail invalid', function () {
            var req, res;
            req = req_mock();
            req.body.compMail = '';
            res = {
                'send': function (x) {
                    assert.equal('Mail invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('WebSite invalid', function () {
            var req, res;
            req = req_mock();
            req.body.compWeb = '';
            res = {
                'send': function (x) {
                    assert.equal('WebSite invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Expire date invalid', function () {
            var req, res;
            req = req_mock();
            req.body.expireDate = '';
            res = {
                'send': function (x) {
                    assert.equal('Expire date invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Delete password invalid', function () {
            var req, res;
            req = req_mock();
            req.body.deletePassword = '';
            res = {
                'send': function (x) {
                    assert.equal('Delete password invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Job title invalid', function () {
            var req, res;
            req = req_mock();
            req.body.jobTitle = '';
            res = {
                'send': function (x) {
                    assert.equal('Job title invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Job type invalid', function () {
            var req, res;
            req = req_mock();
            req.body.jobType = '';
            res = {
                'send': function (x) {
                    assert.equal('Job type invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Job location invalid', function () {
            var req, res;
            req = req_mock();
            req.body.jobLocation = '';
            res = {
                'send': function (x) {
                    assert.equal('Job location invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('Job description invalid', function () {
            var req, res;
            req = req_mock();
            req.body.jobDesc = '';
            res = {
                'send': function (x) {
                    assert.equal('Job description invalid', x.message[0]);
                }
            };
            saveJob(req, res);
        });
        test('How to Apply is required', function () {
            var req, res;
            req = req_mock();
            req.body.howToApply = '';
            res = {
                'send': function (x) {
                    assert.equal('How to Apply is required', x.message[0]);
                }
            };
            saveJob(req, res);
        });
    });
    suite('success', function () {
        test('Save', function (done) {
            var db_mock, res;
            db_mock = {
                'collection': function (collectionname) {
                    return {
                        'insert': function (jsonobject, callback) {
                            callback(null);
                        },
                        'findOne': function (query, filter, callback) {
                            callback(null);
                        }
                    };
                }
            };
            GLOBAL.DB = db_mock;
            res = {
                'send': function (x) {
                    assert.equal('New job saved with success.', x.message);
                    assert.ok(x.status);
                    done();
                }
            };
            saveJob(req_mock(), res);
        });
    });
});