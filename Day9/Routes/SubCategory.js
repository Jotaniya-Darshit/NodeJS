const express = require("express");
const route = express.Router();
const CTL = require("../Controller/SubCategoryController");
const passport = require("../Middleware/Passport");
const upload = require("../Middleware/Multer");

route.get("/GoToSubCategoryForm",passport.checkAuth,CTL.GoToSubCategoryForm);
route.post("/addsubCat",passport.checkAuth,CTL.addsubCategory);
route.get("/GoToViewSubCategory",passport.checkAuth,upload,CTL.GoToViewSubCategory);

// route.get("/editData",CTL.editData);
// route.get("/deleteData",CTL.deleteData);
// route.post("/updateData",CTL.updateData);

module.exports = route;