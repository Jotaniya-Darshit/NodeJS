const express = require("express");
const route = express.Router();
const adminCtl = require("../controllers/adminCtl");
const adminAuth = require("../middleware/adminAuth");

route.post("/registerAdmin",adminCtl.registerAdmin);
route.post("/loginAdmin",adminCtl.loginAdmin);
route.get("/logoutAdmin",adminCtl.logoutAdmin);
route.get("/viewAdmin",adminAuth,adminCtl.viewAdmin);
route.get("/profileAdmin",adminAuth,adminCtl.profileAdmin);
route.post("/changePasswordAdmin",adminAuth,adminCtl.changePasswordAdmin)
route.post("/forgotPasswordAdmin",adminCtl.forgotPasswordAdmin)
route.post("/resetPasswordAdmin",adminCtl.resetPasswordAdmin)

// manager
route.post("/addManager",adminAuth,adminCtl.addManager)
route.get("/viewManager",adminAuth,adminCtl.viewManager)
route.get("/deleteManager/:id",adminAuth,adminCtl.deleteManager)

// employee
route.get("/viewEmployee",adminAuth,adminCtl.viewEmployee);
route.get("/deleteEmployee/:id",adminAuth,adminCtl.deleteEmployee)

module.exports = route;