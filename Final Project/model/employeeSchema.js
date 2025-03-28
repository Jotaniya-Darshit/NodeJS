const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    employeeImage: {
        type: String,
        required: true,
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
        required: true,
    },
});

const EmployeeSchema = mongoose.model("Employee", schema);

module.exports = EmployeeSchema;