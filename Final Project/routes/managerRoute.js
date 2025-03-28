const express = require("express");
const route = express.Router();
const ManagerCtl = require("../controllers/managerCtl");
const managerAuth = require("../middleware/managerAuth");


const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage:Storage}).single("employeeImage");

route.post("/loginManager",ManagerCtl.loginManager)
route.get("/profileManager",managerAuth,ManagerCtl.profileManager)
route.post("/changePassManager",managerAuth,ManagerCtl.changePassManager)
route.post("/changePassManager",managerAuth,ManagerCtl.changePassManager)
route.post("/forgotPassManager",ManagerCtl.forgotPassManager)
route.post("/resetPassManager",ManagerCtl.resetPassManager)

// employee
route.post("/addEmployee",managerAuth,upload,ManagerCtl.addEmployee)
route.get("/viewEmployee",managerAuth,ManagerCtl.viewEmployee)

module.exports = route;