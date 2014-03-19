/*jslint node:true, unparam: true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');

function req_mock() {
    return {
        'params': {
            "_id": '1234tes5678'
        }
    };
}

suite('job.deleteById', function () {
    var deleteById;
    setup(function () {
        GLOBAL.INFRA = require('../../../infrastructure/');
        deleteById = require('../../../services/jobs.js').deleteById;
    });
    suite('errors', function () {
        test('Delete invalid id', function (done) {
            var db_mock, res;
            db_mock = {
                'collection': function (collectionname) {
                    return {
                        'remove': function (query, callback) {
                            callback(null);
                        }
                    };
                }
            };
            GLOBAL.DB = db_mock;
            res = {
                'send': function (x) {
                    assert.equal("ID don't exists or password incorrect", x.message[0]);
                    assert.ok(!x.status);
                    done();
                }
            };
            deleteById(req_mock(), res);
        });
    });
    suite('success', function () {
        test('Delete valid id', function (done) {
            var db_mock, res;
            db_mock = {
                'collection': function (collectionname) {
                    return {
                        'remove': function (query, callback) {
                            callback(null, 1);
                        }
                    };
                }
            };
            GLOBAL.DB = db_mock;
            res = {
                'send': function (x) {
                    assert.equal("Deleted with success", x.result);
                    assert.ok(x.status);
                    done();
                }
            };
            deleteById(req_mock(), res);
        });
    });
});