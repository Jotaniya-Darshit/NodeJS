const jwt = require("jsonwebtoken");

const ManagerAuth = (req, res, next) => {
    let token = req.header("Authorization");
    // console.log(token);
    if (!token) {
        return res.status(200).json({ msg: "Token not found with req !" });
    }
    let newToken = token.slice(7, token.length);
    
    let decode = jwt.verify(newToken,"rnw");
    req.manager = decode;
    next();
    
}

module.exports = ManagerAuth;