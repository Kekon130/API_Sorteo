const jwt = require('jsonwebtoken')

function generateAccessToken(seller){
    return jwt.sign({sellerID: seller.id},process.env.JWT_ACCESS_SECRET, {
        expiresIn: '10m',
    });
}


function generateRefreshToken(user, jti){
    return jwt.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}

function generateTokens(seller, jti){
    const accessToken = generateAccessToken(seller);
    const refreshToken = generateRefreshToken(seller,jti);

    return{ accessToken, refreshToken,};
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
};