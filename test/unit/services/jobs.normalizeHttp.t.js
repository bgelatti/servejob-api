/*jslint node:true, nomen:true*/
/*globals suite, test, setup*/
'use strict';

var assert = require('assert');

suite('normalizeHttp', function () {
    var _normalizeHttp;
    setup(function () {
        _normalizeHttp = require('../../../services/jobs.js')._normalizeHttp;
    });
    test('remove http', function () {
        var string1 = _normalizeHttp('http://test.com');
        assert('test.com', string1);
    });
    test('remove https', function () {
        var string1 = _normalizeHttp('https://test.com');
        assert('test.com', string1);
    });
    test('remove blank', function () {
        var string1 = _normalizeHttp('test.com');
        assert('test.com', string1);
    });
});