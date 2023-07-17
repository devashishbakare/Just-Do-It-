const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  console.log("authHeader " + authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log("token received " + token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decoded.userId;
      console.log("userId " + decoded.userId);
      next(); //move with next execution
    } catch (error) {
      res.status(403).json("you are not authorize to access this");
    }
  } else {
    next();
  }
};

module.exports = authenticate;
