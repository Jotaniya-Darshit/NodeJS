const cateschema = require("../Model/Category");
const subcatschema = require("../Model/SubCategory");
const extracatschema = require("../Model/ExtraCategory");
const productschema = require("../Model/Product");

module.exports.GoToProductForm = async (req,res) => {
    const category = await cateschema.find({});
    const subcategory = await subcatschema.find({});
    const extracategory = await extracatschema.find({});
    
    res.render("ProductForm", {category, subcategory,extracategory});
}

module.exports.AddProduct = async (req,res) => {
    req.body.img = req.file.path;
    
    console.log(req.body);
    
    await productschema.create(req.body).then(()=>{
        res.redirect("/Product/ProductForm");
    });
};

module.exports.viewProduct = async (req,res)=>{
    await productschema
    .find({})
    .populate({
        path:"extracat",
        populate:{
            path:"subcat",
            populate:{
                path:"categoryId"
            }
        }
    })
    .then((data)=>{
        res.render("ViewProduct",{data})
    })
};