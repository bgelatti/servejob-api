/*jslint node:true, unparam: true*/
/*globals suite, test, setup, GLOBAL, CONFIG*/
'use strict';

var assert = require('assert');

function res_mock() {
    var content = {};

    return {
        'header': function (x, y) {
            content[x] = y;
        },
        'content': content
    };
}

suite('allowHeader', function () {
    var allowHeader;
    setup(function () {
        GLOBAL.CONFIG = {
            'allow_origin': '*'
        };
        allowHeader = require('../../../infrastructure/allowHeader.js');
    });
    test('test default', function () {
        var res = res_mock();
        allowHeader.get(null, res, function (x) {
            assert.equal('*', res.content['Access-Control-Allow-Origin']);
            assert.equal('Content-Type, Authorization', res.content['Access-Control-Allow-Headers']);
            assert.equal('application/json; charset=utf-8', res.content['Content-Type']);
        });
    });
    suite('allowHeader Params', function () {
        test('get', function () {
            var res = res_mock();
            allowHeader.get(null, res, function (x) {
                assert.equal('GET', res.content['Access-Control-Allow-Methods']);
            });
        });
        test('post', function () {
            var res = res_mock();
            allowHeader.post(null, res, function (x) {
                assert.equal('POST', res.content['Access-Control-Allow-Methods']);
            });
        });
        test('put', function () {
            var res = res_mock();
            allowHeader.put(null, res, function (x) {
                assert.equal('PUT', res.content['Access-Control-Allow-Methods']);
            });
        });
        test('del', function () {
            var res = res_mock();
            allowHeader.del(null, res, function (x) {
                assert.equal('DELETE', res.content['Access-Control-Allow-Methods']);
            });
        });
        test('all', function () {
            var res = res_mock();
            allowHeader.all(null, res, function (x) {
                assert.equal('GET,POST,PUT,DELETE', res.content['Access-Control-Allow-Methods']);
            });
        });
    });
});