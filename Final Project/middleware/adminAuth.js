const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    let token = req.header("Authorization");
    // console.log(token);
    if (!token) {
        return res.status(200).json({ msg: "Token not found with req !" });
    }
    let newToken = token.slice(7, token.length);
    
    let decode = jwt.verify(newToken,"rnw");
    req.adminUser = decode;
    next();
    
}

module.exports = adminAuth;