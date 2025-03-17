const express = require("express");
const routes = express.Router();
const upload = require("../Middleware/Multer");
const CTL = require("../Controller/Controller");
const passport = require("../Middleware/Passport");


routes.get("/",CTL.GotoLogin);
routes.post("/Login",passport.authenticate("local",{ failureRedirect: "/" }),CTL.Userlogin);
routes.get("/LogOut",passport.checkAuth,CTL.logOut);
routes.get("/DashBoard",passport.checkAuth,CTL.Show);
routes.get("/Form",passport.checkAuth,CTL.GotoForm);
routes.get("/Tables",passport.checkAuth,CTL.GotoTable);
routes.post("/AddData",upload,CTL.AddData);
routes.get("/GoToProfile",passport.checkAuth,CTL.GoToProfile)

routes.get("/GotoChangePass",CTL.GoToChangePassWord);
routes.post("/UpdatePassword",CTL.UpdatePass);

routes.post("/SendOTP",CTL.SendOTP);
routes.post("/RecoverPass",CTL.RecoverPassword);

module.exports = routes ;