const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedtoken = jwt.verify(token, process.env.SECRET);
    const ID_User = decodedtoken.userId;
    req.body.userId = ID_User;
    next();
  } catch (error) {
    res.status(401).send({
      message: "You are not authenticated",
      success: false,
      data: error
    });
  }
};
