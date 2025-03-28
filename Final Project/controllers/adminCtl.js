const adminSchema = require("../model/registerAdminSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer");
const ManagerSchema = require("../model/ManagerSchema");
const EmployeeSchema = require("../model/employeeSchema");

module.exports.registerAdmin = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email });
    if (admin) {
        return res.status(200).json({ msg: "admin already registered !" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "admin"

    // console.log(req.body.password);

    await adminSchema.create(req.body).then(() => {
        res.status(200).json({ msg: "admin registered successfully !" });
    })

}

module.exports.loginAdmin = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email });
    if (!admin) {
        return res.status(200).json({ msg: "admin not registered !" });
    }
    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({ admin }, "rnw", { expiresIn: "1h" })
        res.status(200).json({ msg: "admin login successfully !", token: token });
    } else {
        res.status(200).json({ msg: "Password is wrong !" });
    }
}

module.exports.logoutAdmin = (req, res) => {
    // res.cookie("jwt", "rnw", { maxAge: 0 })
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully" });
};


module.exports.viewAdmin = async (req, res) => {
    await adminSchema.find({}).then((data) => {
        res.status(200).json({ admin: data });
    });
}

module.exports.profileAdmin = (req, res) => {
    let admin = req.adminUser.admin;
    console.log(admin);
    res.status(200).json({ admin })
}

module.exports.changePasswordAdmin = async (req, res) => {
    let admin = req.adminUser.admin;
    // console.log(admin.password);
    // console.log(req.body.currentPass);


    if (await bcrypt.compare(req.body.currentPass, admin.password)) {

        if (req.body.newPass != req.body.currentPass) {

            if (req.body.newPass == req.body.confirmPass) {
                newPass = await bcrypt.hash(req.body.newPass, 10);

                await adminSchema.findByIdAndUpdate(admin._id, { password: newPass }).then(() => {
                    res.status(200).json({ msg: "Password Change successfully !" });
                })
            }
        } else {
            res.status(200).json({ msg: "Current and New Password are same !" });
        }
    } else {
        res.status(200).json({ msg: "Current Password Wrong !" });
    }
}


module.exports.forgotPasswordAdmin = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email });
    // console.log(admin);

    if (!admin) {
        res.status(200).json({ msg: "Admin Not Found !" });
    }

    let otp = Math.floor(Math.random() * 100000 + 900000);
    console.log(otp);

    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminData = admin;

    res.status(200).json({ msg: "Otp Sent Successfully" });
}

module.exports.resetPasswordAdmin = async (req, res) => {
    let adminData = req.session.adminData;
    let otp = req.session.otp;
    // console.log(adminData,otp);
    if (otp == req.body.otp) {
        if (req.body.otp != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {
                req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
                await adminSchema.findByIdAndUpdate(adminData._id, { password: req.body.newPassword }).then(() => {
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

// manager
module.exports.addManager = async (req, res) => {
    // console.log(req.body);
    let manager = await ManagerSchema.findOne({ email: req.body.email });
    if (manager) {
        return res.status(200).json({ msg: "Manager already Added !" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "Manager";

    // console.log(req.body);
    await ManagerSchema.create(req.body).then(() => {
        res.status(200).json({ msg: "Manager Added Successfully !" });
    })
}

module.exports.viewManager = async (req, res) => {
    await ManagerSchema.find({}).then((manager) => {
        res.status(200).json({ manager })
    })
}

module.exports.deleteManager = async (req, res) => {
    await ManagerSchema.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ msg: "Manager deleted successfully !" });
    })
}


// employee
module.exports.viewEmployee = async (req, res) => {
    await EmployeeSchema.find({}).then((employee) => {
        res.status(200).json({ employee })
    })
}

module.exports.deleteEmployee = async (req, res) => {
    await EmployeeSchema.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ msg: "Employee deleted successfully !" });
    })
}