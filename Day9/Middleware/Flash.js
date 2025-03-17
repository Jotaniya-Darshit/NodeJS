module.exports.SetFlash = (req,res,next) => {
    res.locals.flash = {
        "success" : req.flash("Login SuccessFully"),
        "error" : req.flash("Incorrect Username or Password")
    }
    next();
}