const express = require('express');
const port = 5173;
const path = require('path');

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/CSS",express.static(path.join(__dirname,"CSS")))

app.get("/",(req,res)=>{
    res.render("index");
    res.end();
});

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server is running on port ${port}`);
});