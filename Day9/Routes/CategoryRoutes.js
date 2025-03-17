const express = require("express");
const router = express.Router();
const CTL = require("../Controller/CategoryController");
const multer = require("../Middleware/Multer");

router.get("/GoToCategoryForm",CTL.GoToCategoryForm)
router.get("/GoToViewCategory", CTL.GoToViewCategory)
router.post("/AddCate",multer,CTL.AddCate)

// router.get("/editCat",multer,CTL.editCat);
// router.post("/updateData",multer,CTL.updateData);
// router.get("/deleteData",CTL.deleteData)

module.exports = router;