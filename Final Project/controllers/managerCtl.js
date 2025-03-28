const ManagerSchema = require("../model/ManagerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer");
const EmployeeSchema = require("../model/employeeSchema");

module.exports.loginManager = async (req, res) => {
    let Manager = await ManagerSchema.findOne({ email: req.body.email });
    if (!Manager) {
        return res.status(200).json({ msg: "Manager not registered !" });
    }
    if (await bcrypt.compare(req.body.password, Manager.password)) {
        let token = jwt.sign({ Manager }, "rnw", { expiresIn: "1h" })
        res.status(200).json({ msg: "Manager login successfully !", token: token });
    } else {
        res.status(200).json({ msg: "Password is wrong !" });
    }
}

module.exports.profileManager = (req, res) => {
    let manager = req.manager;
    // console.log(manager);
    res.status(200).json({ manager });
}

module.exports.changePassManager = async (req, res) => {
    let manager = req.manager.Manager;
    // console.log(manager);
    // console.log(req.body);

    if (await bcrypt.compare(req.body.currentPass, manager.password)) {

        if (req.body.newPass != req.body.currentPass) {

            if (req.body.newPass == req.body.confirmPass) {
                newPass = await bcrypt.hash(req.body.newPass, 10);

                await ManagerSchema.findByIdAndUpdate(manager._id, { password: newPass }).then(() => {
                    res.status(200).json({ msg: "Password Change successfully !" });
                })
            } else {
                res.status(200).json({ msg: "New and Confirm Password are same !" });
            }
        } else {
            res.status(200).json({ msg: "Current and New Password are same !" });
        }
    } else {
        res.status(200).json({ msg: "Current Password Wrong !" });
    }

}

module.exports.forgotPassManager = async (req, res) => {
    let manager = await ManagerSchema.findOne({ email: req.body.email });
    // console.log(admin);

    if (!manager) {
        res.status(200).json({ msg: "Manager Not Found !" });
    }

    let otp = Math.floor(Math.random() * 100000 + 900000);
    console.log(otp);

    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.managerData = manager;

    res.status(200).json({ msg: "Otp Sent Successfully" });
}

module.exports.resetPassManager = async (req, res) => {
    let managerData = req.session.managerData;
    let otp = req.session.otp;
    // console.log(managerData,otp);
    if (otp == req.body.otp) {
        if (req.body.otp != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {
                req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
                await ManagerSchema.findByIdAndUpdate(managerData._id, { password: req.body.newPassword }).then(() => {
                    res.status(200).json({ msg: "Password changed successfully !" });
                })
            } else {
                res.status(200).json({ msg: "Both password are not same !" });
            }
        } else {
            res.status(200).json({ msg: "OTP and Password are not allow to same !" });
        }
    } else {
        res.status(200).json({ msg: "OTP is incorrected !" });
    }

}

// employee
module.exports.addEmployee = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    let employee = await EmployeeSchema.findOne({ email: req.body.email });
    if (employee) {
        return res.status(200).json({ msg: "employee already Added !" });
    }
    req.body.employeeImage = req.file.path;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "employee";

    // console.log(req.body);
    await EmployeeSchema.create(req.body).then(() => {
        res.status(200).json({ msg: "employee Added Successfully !" });
    })
}

module.exports.viewEmployee = async (req, res) => {
    await EmployeeSchema.find({}).then((employee) => {
        res.status(200).json({ employee })
    })
}