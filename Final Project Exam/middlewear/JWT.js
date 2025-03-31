const jwt = require("jsonwebtoken");

const AdminAuth = (req, res, next) => {
  let token = req.cookies.auth_token;

  if (!token) {
    console.log("No token found");
    return res.redirect("/login");
  }

  try {
    let decode = jwt.verify(token, "abc");

    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = AdminAuth;
