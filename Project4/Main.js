const express = require('express');
const port = 5173;
const path = require('path');
const db = require("./Config/DB");
const schema = require("./Model/FirstSchema");

const app = express();
app.set("view engine","ejs");
app.use("/CSS",express.static(path.join(__dirname,"CSS")));
app.use(express.urlencoded());

app.get("/", async (req,res)=>{
    await schema.find({}).then((data)=>{
        res.render("Index",{data});
    })
});

app.post("/add", async (req,res)=>{
    console.log(req.body);
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    });
});

app.get("/deleteData", async (req,res)=>{
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    });
});

app.get("/editData", async (req,res)=>{
    let specificData = await schema.findById(req.query.id);
    res.render("Edit",{specificData});
});

app.post("/updateData", async(req,res)=>{
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    });
});

app.listen(port,(err)=>{
    err ? console.log(err) : console.log( `Server is running on port ${port}`);
});