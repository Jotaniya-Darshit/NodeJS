const express = require("express")
const rout = express.Router()
const ctl = require("../controller/Userctl")
const auth = require("../middlewear/JWT")

rout.get("/",ctl.SignupPage)
rout.get("/login",ctl.LoginPage)
rout.post("/signupData",ctl.SignupData)
rout.post("/loginData",ctl.LoginData)
rout.get("/home",auth,ctl.HomePage)
rout.get("/logout",ctl.Logout)
rout.get("/addBlog",auth,ctl.AddBlog)
rout.post("/submitBlog",auth,ctl.AddBlogData)
rout.get("/viewBlog",auth,ctl.ViewBlog)
rout.get("/delete",auth,ctl.DeleteBlog)
rout.get("/edit",auth,ctl.Edit)
rout.post("/editBlog",auth,ctl.EditBlog)

module.exports = rout