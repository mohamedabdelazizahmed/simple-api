const jwt = require("jwt");
// [front-end] append token in header  in Authorization: Bearer + token
module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error('Not authentication')
        error.statusCode =401;
        throw error;
    }

  //split white space after Bearer
  const token = authHeader.split(" ")[1];
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
