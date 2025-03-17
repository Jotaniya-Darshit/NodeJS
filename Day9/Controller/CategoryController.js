const schema = require("../Model/Category");
const fs = require("fs")
const path = require("path")

module.exports.GoToCategoryForm = (req, res) => {
    res.render("CategoryForm");
};

module.exports.AddCate = async (req, res) => {
    req.body.catimage = req.file.path;
    await schema.create(req.body)
        .then(() => {
            res.redirect("/Category/CategoryForm");
        })
}
    
module.exports.GoToViewCategory = async (req, res) => {
    await schema.find({})
        .then((data) => {
            res.render("ViewCategory", { data })
        })
}

// module.exports.deleteData = async(req,res) => {
//     await schema.findByIdAndDelete(req.query.id)
//     res.redirect("/Category/ViewCategory");
// }


// module.exports.editCat = async (req, res) => {
//     let data = await schema.findById(req.query.id)
//     res.render("editcate", { data })
// }

// module.exports.updateData = async (req,res) => {
//     let img = ""
//     let singleData = await schema.findById(req.body.id);

//     if(singleData){
//         img = req.file ? req.file.path : singleData.catimage;
//         if(req.file && singleData.catimage)
//         {
//             fs.unlinkSync(singleData.catimage);
//         }

//         req.body.catimage = img;
//         await schema.findByIdAndUpdate(req.body.id, req.body);
//     }
//     res.redirect("/category/viewCat");
// }