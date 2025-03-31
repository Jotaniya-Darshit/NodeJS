const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/db");
const cookies = require("cookie-parser");
const path = require("path")

app.set("view engine", "ejs");
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./Routes/rout"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started at " + port);
    }
});
