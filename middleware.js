const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    //@ts-ignore
    req.userId = decoded.id; //Here we are setting the userId in the request object
    next();
  } else {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
};

module.exports = userMiddleware;
