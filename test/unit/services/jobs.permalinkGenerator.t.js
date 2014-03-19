/*jslint node:true, unparam:true, nomen:true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');


suite('job.permalinkGenerator', function () {
    var _permalinkGenerator;
    setup(function () {
        GLOBAL.INFRA = require('../../../infrastructure/');
        _permalinkGenerator = require('../../../services/jobs.js')._permalinkGenerator;
    });
    suite('success', function () {
        test('Generate permalink', function (done) {
            var db_mock;
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
            _permalinkGenerator('compName', 'jobTitle', function (permalink) {
                assert.equal('compname-jobtitle', permalink);
                done();
            });
        });
    });
});