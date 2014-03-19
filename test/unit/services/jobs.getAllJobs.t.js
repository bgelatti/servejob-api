/*jslint node:true, unparam: true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');

suite('job.getAllJobs', function () {
    var getAllJobs;
    setup(function () {
        GLOBAL.INFRA = require('../../../infrastructure/');
        getAllJobs = require('../../../services/jobs.js').getAllJobs;
    });
    suite('success', function () {
        test('Get all jobs', function (done) {
            var db_mock, res, req;
            db_mock = {
                'collection': function () {
                    return {
                        'find': function () {
                            return {
                                'count': function (callback) {
                                    callback(null, 5);
                                },
                                'sort': function () {
                                    return {
                                        'skip': function () {
                                            return {
                                                'limit' : function () {
                                                    return {
                                                        'toArray': function (callback) {
                                                            var arrayresult = [{
                                                                "compName": "test"
                                                            }];
                                                            callback(null, arrayresult);
                                                        }
                                                    };
                                                }
                                            };
                                        }
                                    };
                                }
                            };
                        }
                    };
                }
            };
            GLOBAL.DB = db_mock;
            res = {
                'send': function (x) {
                    assert.equal(5, x.result.total_items);
                    assert.equal(1, x.result.total_pages);
                    assert.equal("test", x.result.items[0].compName);
                    assert.ok(x.status);
                    done();
                }
            };
            req = {
                "query": {}
            };
            getAllJobs(req, res);
        });
    });
});