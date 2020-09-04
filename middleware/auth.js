const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth");
  if (!token) return res.status(401).send("Access denied");

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
