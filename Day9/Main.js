const express = require("express");
const multer = require("multer");
const path = require("path");
const cookie = require("cookie-parser");
const DB = require("./Config/DB");
const port = 5173;
const session = require("express-session");
const passport = require("./Middleware/Passport");
const flash = require("connect-flash");
const flashconnect = require("./Middleware/Flash");

const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    name: "local",
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie : { maxAge : 100 * 100 * 60 }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.AuthenticatedUser);
app.use(flash());
app.use(flashconnect.SetFlash);
app.use(cookie());
app.use(express.urlencoded());
app.use("/Uploads",express.static(path.join(__dirname, "Uploads")))
app.use(express.static(path.join(__dirname,"Public")));
app.use("/", require("./Routes/Routes"));
app.use("/Category", require("./Routes/CategoryRoutes"));
app.use("/SubCategory", require("./Routes/SubCategory"));
app.use("/ExtraCategory", require("./Routes/ExtraCategory"));
app.use("/Product", require("./Routes/ProductRoutes"));

app.listen(port, (err) => {
  err ? console.log(err) : console.log("Server Stared at port " + port);
});