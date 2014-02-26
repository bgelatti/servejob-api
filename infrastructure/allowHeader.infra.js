/*jslint node: true, unparam: true, white: true, nomen: true*/
'use strict';

var _default = function (res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
};

var get = function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET');
    _default(res, next);
};

var post = function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST');
    _default(res, next);
};

var put = function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'PUT');
    _default(res, next);
};

var _delete = function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'DELETE');
    _default(res, next);
};

var all = function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    _default(res, next);
};

exports.default = _default;
exports.get = get;
exports.post = post;
exports.put = put;
exports.delete = _delete;
exports.all = all;
