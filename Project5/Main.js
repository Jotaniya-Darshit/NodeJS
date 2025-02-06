const express = require("express");
const multer = require("multer");
const path = require("path");
const DB = require("./Config/DB");
const port = 5173;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/CSS", express.static(path.join(__dirname, "CSS")));
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

app.use("/", require("./Routes/Routes"));

app.listen(port, (err) => {
  err ? console.log(err) : console.log("Server Stared at port " + port);
});