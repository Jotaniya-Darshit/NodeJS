const schema = require("../Model/schema");
const fs = require("fs");
const cookie = require("cookie-parser");
const mailer = require("../Middleware/Mailer");
const { log } = require("console");


module.exports.GotoLogin = async (req, res) => {
    res.render("Login");
}

module.exports.Userlogin = async (req, res) => {
    // await schema.findOne({}).then(data => {
    //     if( data.password == req.body.password){
    //         res.cookie("AData", data);
    //         res.redirect("/DashBoard");
    //     }else{
    //         res.redirect("/");
    //     }
    // })
    req.flash("success", "login successfully !");
    res.redirect("/DashBoard");
}

module.exports.logOut = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.Show = async (req, res) => {
    res.render("DashBoard") 
}

module.exports.GotoForm = async (req,res)=>{
    res.render("Form");
}

module.exports.GotoTable = async (req,res)=>{
    await schema.find({}).then((data)=>{
        res.render("ViewAdmin",{data});
    })
}

module.exports.GoToProfile = async (req,res)=>{
    res.render("Profile");
}

module.exports.AddData = async (req,res)=>{
    console.log(req.file);
    req.body.img = req.file.path;
    console.log(req.body);
    await schema.create(req.body).then(()=>{
        res.redirect("/Form");
    });
    
};

module.exports.GoToChangePassWord = (req,res) => {
    res.render("ChangePassWord");
}

module.exports.UpdatePass = async (req, res) => {
    let User = req.user
    console.log(User);
    // if (User.password == req.body.OldPass) {
    //     if (req.body.OldPass != req.body.NewPass) {
    //         if (req.body.NewPass == req.body.ConPass) {
    //             let admin = await schema.findByIdAndUpdate(User.id, { password: req.body.NewPass })
    //             admin && res.redirect("/logOut");
    //         }
    //         else {
    //             console.log("new Password and confirm password are not same");
    //         }
    //     }
    //     else {
    //         console.log("old and new password are same");
    //     }
    // }
    // else {
    //     console.log("old password is not correct");
    // }
}

module.exports.SendOTP = async (req,res) => {
    let admin = await schema.findOne({ email: req.body.email });

    if (!admin) {
        return res.redirect("/");
    }

    let otp = Math.floor(Math.random() * 100000 + 900000)
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminData = admin

    res.render("VerifyOTP");
};


module.exports.RecoverPassword = async (req, res) => {
    let otp = req.session.otp;
    let admin = req.session.adminData

    if (req.body.otp == otp) {
        if (req.body.NewPass == req.body.ConPass) {
            let adminData = await schema.findByIdAndUpdate(admin._id, { password: req.body.NewPass });
            adminData && res.redirect("/logout");
            console.log("Password Change Successfully");
        }
        else {
            console.log("new password and conform pass in not match");
        }
    }
    else {
        res.redirect("/logout");
    };
};