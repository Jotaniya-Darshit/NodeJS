const EmployeeSchema = require("../model/employeeSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const mailer = require("../middleware/mailer");

module.exports.loginEmployee = async (req, res) => {
    // console.log(req.body);
    let employee = await EmployeeSchema.findOne({ email: req.body.email });
    // console.log(employee);
    if (!employee) {
        return res.status(200).json({ msg: "Employee not registered !" });
    }
    if (await bcrypt.compare(req.body.password, employee.password)) {
        let token = jwt.sign({ employee }, "rnw", { expiresIn: "1h" })
        res.status(200).json({ msg: "Employee login successfully !", token: token });
    } else {
        res.status(200).json({ msg: "Password is wrong !" });
    }

}

module.exports.profileEmployee = async (req, res) => {
    let employee = req.employee.employee;
    // console.log(employee);
    res.status(200).json({ employee });
}

module.exports.changePassEmployee = async (req, res) => {
    let employee = req.employee.employee;
    // console.log(employee);
    // console.log(req.body);  
    if (await bcrypt.compare(req.body.currentPass, employee.password)) {
        if (req.body.newPass != req.body.currentPass) {

            if (req.body.newPass == req.body.confirmPass) {
                newPass = await bcrypt.hash(req.body.newPass, 10);

                await EmployeeSchema.findByIdAndUpdate(employee._id, { password: newPass }).then(() => {
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

module.exports.forgotPassEmployee = async (req, res) => {
    let employee = await EmployeeSchema.findOne({ email: req.body.email });
    // console.log(admin);

    if (!employee) {
        res.status(200).json({ msg: "Employee Not Found !" });
    }

    let otp = Math.floor(Math.random() * 100000 + 900000);
    console.log(otp);

    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.employeeData = employee;

    res.status(200).json({ msg: "Otp Sent Successfully" });
}

module.exports.resetPassEmployee = async (req, res) => {
    let employeeData = req.session.employeeData;
    let otp = req.session.otp;
    // console.log(employeeData,otp);
    if (otp == req.body.otp) {
        if (req.body.otp != req.body.newPassword) {
            if (req.body.newPassword != employeeData.password) {
                if (req.body.newPassword == req.body.confirmPassword) {
                    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
                    await EmployeeSchema.findByIdAndUpdate(employeeData._id, { password: req.body.newPassword }).then(() => {
                        res.status(200).json({ msg: "Password changed successfully !" });
                    })
                } else {
                    res.status(200).json({ msg: "Both password are not same !" });
                }
            }else{
                res.status(200).json({ msg: "Password is not using old !" });

            }

        } else {
            res.status(200).json({ msg: "OTP and Password are not allow to same !" });
        }
    } else {
        res.status(200).json({ msg: "OTP is incorrected !" });
    }

}