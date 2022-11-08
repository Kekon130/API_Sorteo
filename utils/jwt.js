const jwt = require('jsonwebtoken')

function generateAccessToken(seller){
    return jwt.sign({sellerID: seller.id},process.env.JWT_ACCESS_SECRET, {
        expiresIn: '10m',
    });
}

function checkToken(token){
    try{
        return jwt.verify(token,process.env.JWT_ACCESS_SECRET);
    }catch(error){
        return undefined;
    }
}


module.exports = {
    generateAccessToken,
    checkToken,
};