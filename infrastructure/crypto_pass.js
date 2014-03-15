/*jslint node: true, unparam: true, white: true, nomen: true*/
'use strict';

var crypto = require('crypto');

function cryptoPass(pass) {
    return crypto.createHash('sha512').update(pass).digest('hex');
}

module.exports = cryptoPass;