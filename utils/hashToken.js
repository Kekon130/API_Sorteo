const crypto = require('crypto')

function hasToken(token){
    return crypto.createHash('sha512').update(token).digest('hex');
}

module.exports={hasToken};