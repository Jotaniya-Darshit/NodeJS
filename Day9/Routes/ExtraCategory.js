const exprees = require("express");
const route = exprees.Router();
const CTL = require("../Controller/ExtraCategoryController");

route.get("/GoToExtraCategoryForm", CTL.GoToExtraCategoryForm);
route.post("/addextraCat", CTL.addextraCategory);
route.get("/GoToViewExtraCategory",CTL.GoToViewExtraCategory);

// route.get("/editData", CTL.editData);
// route.post("/updateData", CTL.updateData);
// route.get("/deleteData", CTL.deleteData);

module.exports = route;