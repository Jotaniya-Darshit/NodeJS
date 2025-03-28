const express = require("express");
const route = express.Router();
const employeeCtl = require("../controllers/employeeCtl");
const EmployeeAuth = require("../middleware/employeeAuth");

route.post("/loginEmployee", employeeCtl.loginEmployee);
route.get("/profileEmployee", EmployeeAuth, employeeCtl.profileEmployee);
route.post("/changePassEmployee", EmployeeAuth, employeeCtl.changePassEmployee);
route.post("/forgotPassEmployee", employeeCtl.forgotPassEmployee);
route.post("/resetPassEmployee", employeeCtl.resetPassEmployee);

module.exports = route;