const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport
({
    service: "Gmail",
    auth: {
        user: "jotaniyadarshit1235@gmail.com",
        pass: "ctsqmwxxpnetxfic",
    },
});

module.exports.sendOtp = (to,Otp) => {
    let mailoptions = {
        from : "jotaniyadarshit1235@gmail.com",
        to : to,
        subject : "Your Password Reset OTP",
        text: `Your OTP is ${Otp}`,
    };

    transport.sendMail(mailoptions,(err)=> {
        err ? console.log(err) : console.log("OTP sended Sucessfully");
    });
};