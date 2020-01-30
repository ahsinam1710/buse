const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    //token verify
    try {
      const payload = jwt.verify(token, "34568thfdcfr5gr");
      req.id = payload.id;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Authorization Failed"
      });
    }
  } else {
    res.status(401).json({
      message: "Authorization Failed"
    });
  }
};
