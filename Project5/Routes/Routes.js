const express = require("express");
const routes = express.Router();
const multer = require("multer");
const CTL = require("../Controller/Add");

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: store }).single("img");

routes.get("/",CTL.Show);
routes.post("/Add",upload,CTL.Add);
routes.get("/Delete",CTL.Delete);
routes.get("/Edit",CTL.Edit);
routes.post("/Update",upload,CTL.Update);
routes.get("/AddMovie",CTL.Render)

module.exports = routes ;