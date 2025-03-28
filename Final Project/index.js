const express = require("express");
const port = 1008.
const db = require("./config/db")
const path = require("path")


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/",require("./routes/adminRoute"))
app.use("/manager",require("./routes/managerRoute"))
app.use("/employee",require("./routes/employeeRoute"))


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on port : " + port);
})