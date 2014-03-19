/*jslint node:true, unparam: true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');

function req_mock() {
    return {
        'params': {
            "permalink": 'req-params-permalink'
        }
    };
}

suite('job.getByPermalink', function () {
    var getByPermalink;
    setup(function () {
        GLOBAL.INFRA = require('../../../infrastructure/');
        getByPermalink = require('../../../services/jobs.js').getByPermalink;
    });
    suite('errors', function () {
        test('Get invalid permalink', function (done) {
            var db_mock, res;
            db_mock = {
                'collection': function (collectionname) {
                    return {
                        'findOne': function (query, filter, callback) {
                            callback(null);
                        }
                    };
                }
            };
            GLOBAL.DB = db_mock;
            res = {
                'send': function (x) {
                    assert.equal("Permalink don't exists", x.message[0]);
                    assert.ok(!x.status);
                    done();
                }
            };
            getByPermalink(req_mock(), res);
        });
    });
    suite('success', function () {
        test('Get valid permalink', function (done) {
            var db_mock, res;
            db_mock = {
                'collection': function (collectionname) {
                    return {
                        'findOne': function (query, filter, callback) {
                            var permalink = {
                                'jobName': "jobtest"
                            };
                            callback(null, permalink);
                        }
                    };
                }
            };
            GLOBAL.DB = db_mock;
            res = {
                'send': function (x) {
                    assert.equal("jobtest", x.result.jobName);
                    assert.ok(x.status);
                    done();
                }
            };
            getByPermalink(req_mock(), res);
        });
    });
});