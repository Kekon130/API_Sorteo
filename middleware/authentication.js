const sessionToken = require('../utils/jwt')

function loggin(req,res,next){
    const { token } = req.headers;

  if (!sessionToken.checkToken(token)) {
    return res.status(403).send({ msg: 'Not logged in' });
  }
  return next();
}

module.exports = {
    loggin,
};