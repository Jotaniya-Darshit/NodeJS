const LoginSchema = require("../model/loginSchema");
const BlogSchema = require("../model/BlogSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.SignupPage = (req, res) => {
  res.render("Signup");
};
module.exports.LoginPage = (req, res) => {
  res.render("Login");
};
module.exports.SignupData = async (req, res) => {
  let user = await LoginSchema.findOne({ email: req.body.email });
  if (user) {
    res.status(200).json({ msg: "user alredy exist" });
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  await LoginSchema.create(req.body).then((data) => {
    res.redirect("/login", { user });
  });
};
module.exports.HomePage = async (req, res) => {
  await LoginSchema.find({}).then((data) => {
    res.render("Home", { data });
    console.log(data);
  });
};
module.exports.LoginData = async (req, res) => {
  let user = await LoginSchema.findOne({ email: req.body.email });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      let token = jwt.sign({ userdata: user }, "abc", { expiresIn: "1h" });

      res.cookie("auth_token", token, { httpOnly: true });
      return res.redirect("/home");
    } else {
      return res.status(400).json({ msg: "Password is incorrect" });
    }
  } else {
    return res.status(400).json({ msg: "User not found" });
  }
};

module.exports.Logout = (req, res) => {
  res.clearCookie("auth_token");
  res.redirect("/login");
};
module.exports.AddBlog = (req, res) => {
  res.render("AddUser");
};

module.exports.AddBlogData = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ msg: "User not authenticated" });
  }

  const blogData = {
    author: req.body.author,
    category: req.body.category,
    blogContent: req.body.blogContent,
    userId: req.user.userdata._id,
  };

  await BlogSchema.create(blogData)
    .then((data) => {
      res.redirect("back");
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error adding blog" });
    });
};

module.exports.ViewBlog = async (req, res) => {
  try {
    const blogs = await BlogSchema.find({ userId: req.user.userdata._id });
    res.render("ViewBlog", { data: blogs });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching blogs" });
  }
};

module.exports.DeleteBlog = async (req, res) => {
  let data = await BlogSchema.findByIdAndDelete(req.query.id);
  data && res.redirect("/viewBlog");
};
module.exports.Edit = async (req, res) => {
  await BlogSchema.findById(req.query.id).then((data) => {
    res.render("EditBlog", { data });
  });
};
module.exports.EditBlog = async (req, res) => {
  await BlogSchema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
    res.redirect("/viewBlog");
  });
};
