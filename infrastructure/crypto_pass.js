var crypto = require('crypto');

function cryptoPass(pass){
    return crypto.createHash('sha512').update(pass).digest('hex');
}

module.exports = cryptoPass;