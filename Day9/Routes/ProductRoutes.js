const exprees = require("express");
const route = exprees.Router();
const CTL = require("../Controller/ProductController");
const upload = require("../Middleware/Multer");

route.get("/GoToProductForm",CTL.GoToProductForm);
route.post("/AddProduct",upload,CTL.AddProduct);
route.get("/GoToViewProduct",CTL.viewProduct);

module.exports = route;