const schema = require("../Model/schema");
const fs = require("fs");

module.exports.Show = async (req, res) => {
    await schema.find({}).then((data) => {
        res.render("Index", { data });
    });
};

module.exports.Add = async (req,res)=>{
    req.body.img = req.file.path;
    await schema.create(req.body);
    res.redirect("/");
};

module.exports.Delete = async (req,res) => {
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.img);
    await schema.findByIdAndDelete(req.query.id);
    res.redirect("/");
};

module.exports.Edit = async (req,res) => {
    let specificData = await schema.findById(req.query.id);
    res.render("EditPage", { specificData });
};

module.exports.Update = async (req,res) => {
    let singleData = await schema.findById(req.body.id);
    let newImg = "" ;
    req.file ? newImg = req.file.path : newImg = singleData.img ;
    req.file && fs.unlinkSync(singleData.img);
    req.body.img = newImg;
    await schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
    res.redirect("/");
    });
};

module.exports.Render = async (req,res) => {
    await res.render("AddMovie");
}