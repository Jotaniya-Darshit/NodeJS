const express = require("express");
const port = 5173;
const app = express();

app.set("view engine", "ejs");

app.use("/",require("./Routes/AdminRoutes"));

app.listen(port, (err) => {
    err ? console.log(err) :  console.log(`Server started at http://localhost:${port}`);
});