const jwt = require("jsonwebtoken");



 const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    const token = authHeader.split(" ")[1];
    if(authHeader) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
          if (err) {
            res.status(401).json("token is not valid!");
          }
          req.user = user;
          next();
        });
    } else {
        res.status(403).json("You are not athenticated!");
    }
}

// verify user and admin
const verifyTokenandAuthorization = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user?.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not authenticated")
        }
    })
}
//verify admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authenticated");
    }
  });
};

module.exports = { verifyTokenandAuthorization, verifyAdmin, verifyToken };