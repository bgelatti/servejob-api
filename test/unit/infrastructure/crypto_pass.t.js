/*jslint node:true*/
/*globals suite, test, setup*/
'use strict';

var assert = require('assert');

suite('crypto_pass', function () {
    var crypto_pass;
    setup(function () {
        crypto_pass = require('../../../infrastructure/crypto_pass.js');
    });
    test('cryptographic generation', function () {
        var string1 = crypto_pass('test');
        assert('ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', string1);
    });
    test('cryptographic equality', function () {
        var string1, string2;
        string1 = crypto_pass('test');
        string2 = crypto_pass('test');
        assert.equal(string1, string2);
    });
});