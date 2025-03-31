const mongoose = require("mongoose");

let BlogData = mongoose.Schema({
    author: {
        type: String,
    },
    category: {
        type: String,
    },
    blogContent: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Login", // Reference to the "Login" model (user collection)
        required: true,
    }
});

let BlogAdmin = mongoose.model("BlogData", BlogData);
module.exports = BlogAdmin;
