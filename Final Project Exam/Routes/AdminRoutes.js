const CTL = require("../Controller/AdminCTL");
const router = require("express").Router();

router.get("/",CTL.Login);





module.exports = router