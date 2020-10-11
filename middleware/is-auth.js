const jwt = require("jwt");
// [front-end] append token in header  in Authorization: Bearer + token
module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next(); // to contain with middleware
    }

  //split white space after Bearer
  const token = authHeader.split(" ")[1];
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    req.isAuth = false;
    return dnext(); // to contain with middleware
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next(); // to contain with middleware
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
