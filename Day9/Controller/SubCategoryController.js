const catSchema = require("../Model/Category");
const schema = require("../Model/SubCategory");

module.exports.GoToSubCategoryForm = async (req, res) => {
    await catSchema.find({})
        .then((data) => {
            res.render("SubCategoryForm", { data })
        })
}

module.exports.addsubCategory = async (req, res) => {
    await schema.create(req.body)
        .then(() => {
            res.redirect("/SubCategory/SubCategoryForm")
        })
}

module.exports.GoToViewSubCategory = async (req, res) => {
    await schema.find({}).populate("categoryId")
        .then((data) => {
            res.render("ViewSubCategory", { data })
        })
}

// module.exports.editData = async (req, res) => {
//     const subCategory = await schema.findById(req.query.id);
//     const categories = await catSchema.find();

//     res.render("editsubCat", { data: subCategory, categories });
// }

// module.exports.updateData = async (req, res) => {
//     await schema.findByIdAndUpdate(
//         req.body.id,
//         {
//             subcatName: req.body.subcatName,
//             categoryId: req.body.categoryId
//         },
//         { name: true }
//     )
//     res.redirect("/subCategory/viewsubCat");
// }

// module.exports.deleteData = async (req,res) => {
//     await schema.findByIdAndDelete(req.query.id)
//     res.redirect("/subCategory/viewsubCat")
// }