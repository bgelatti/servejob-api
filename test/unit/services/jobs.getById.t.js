/*jslint node:true, unparam: true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');

function req_mock() {
    return {
        'params': {
            "id": '5323b6fc471101e912432280'
        }
    };
}

suite('job.getById', function () {
    var getById;
    setup(function () {
        GLOBAL.INFRA = require('../../../infrastructure/');
        getById = require('../../../services/jobs.js').getById;
    });
    suite('errors', function () {
        test('Get invalid id', function (done) {
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
                    assert.equal("ID don't exists", x.message[0]);
                    assert.ok(!x.status);
                    done();
                }
            };
            getById(req_mock(), res);
        });
    });
    suite('success', function () {
        test('Get valid id', function (done) {
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
            getById(req_mock(), res);
        });
    });
});