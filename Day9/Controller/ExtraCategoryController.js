const cateschema = require("../Model/Category");
const subcatschema = require("../Model/SubCategory");
const extracatschema = require("../Model/ExtraCategory");

module.exports.GoToExtraCategoryForm = async (req, res) => {
    const category = await cateschema.find({});
    const subcategory = await subcatschema.find({});
    
    res.render("ExtraCategoryForm", {category, subcategory});
}

module.exports.addextraCategory = async (req, res) => {
    await extracatschema.create(req.body)
    res.redirect("/ExtraCategory/ExtraCategoryForm")
}

module.exports.GoToViewExtraCategory = async(req,res) => {
    await extracatschema.find({})
    .populate("categoryId")
    .populate("subcat")
    .then((data)=> {
        res.render("ViewExtraCategory",{data})
    })
}

module.exports.editData = async (req,res) => {
    const extracategory = await extracatschema.findById(req.query.id);
    const subcategory = await subcatschema.find()
    const category = await cateschema.find()

    res.render("editextraCat", { subcategory , category , extracategory});
}

module.exports.updateData = async (req,res) => {    
    await extracatschema.findByIdAndUpdate(req.body.id, req.body)
    res.redirect("/extracategory/viewsubCat");
}

module.exports.deleteData = async (req,res) => {
    await extracatschema.findByIdAndDelete(req.query.id)
    res.redirect("/extracategory/viewsubCat");
}