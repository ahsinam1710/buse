const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const nodemailer = require("nodemailer");
const User = mongoose.model("User");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw "Body was not sent properly.";
    if (!name.includes(" ")) throw "Full name is required. ";
    const emailRegex = /@yahoo.com|@gmail.com|@hotmail.com/;
    if (!emailRegex.test(email)) throw "Email is not supported";
    if (password.length < 6) throw "Password must be at least 6 Character long";
    let user = await User.findOne({ email: email });
    if (user) throw "Email with same user already exists";
    user = new User({ email, name, password: md5(password) });
    await user.save();
    res.json({ message: "Registered 😋" });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw "Body was not sent properly.";
    let user = await User.findOne({ email: email, password: md5(password) });
    if (!user) throw "Email and password doesnot match";
    //json web tokens
    const token = jwt.sign({ id: user._id }, "34568thfdcfr5gr");
    res.json({ message: "Login Successful", token });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
};

exports.forgot = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw "Invalid Email";

    const random = Math.floor(Math.random() * 100000) + 1;

    reset = new User({ passwordResetToken, passwordResetExpires });
    user.passwordResetToken = random;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();

    const gmailUsername = "";
    const gmailPassword = "";

    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      know: {
        user: gmailUsername,
        pass: gmailPassword
      }
    });

    const mailOption = {
      to: user.email,
      from: "BUSE" + "<" + gmailUsername + ">",
      subject: "BUSE Application Password Reset Token",
      text: `You have requested for password reset token.
         Please click on the link to complete the process:
         http://localhost/reset/${random}`
    };

    smtpTransport.sendMail(mailOption, (err, res) => {
      if (err) throw err;
    });

    res.json({
      message: "A password reset email has been sent to " + user.email
    });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
};
exports.reset = async (req, res) => {
  // try {
  //   const { passwordResetExpires, passwordResetToken } = req.body;
  //   user.findOne({
  //     passwordResetToken: req.params.token,
  //     passwordResetExpires: {
  //       $gt: Date.now()
  //     }
  //   });
  //   if (!reset.passwordResetExpires)
  //     throw "Password reset token has exprired or is Invalid";
  //   res.redirect("/reset" + req.params.token);
  //   res.render("/user/forgot", {
  //     title: "Reset your password",
  //     message: errors,
  //     hasErrors: errors.length > 0
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     message: err
  //   });
  // }
};

exports.getprofile = async (req, res) => {
  const user = await User.findById(req.id);
  res.json({ message: "Hi " + user.name, user });
};
exports.getAllProfile = async (req, res) => {
  const allUser = await User.find();
  res.json({ allUser });
};
exports.getResetPassword = async (req, res) => {
  const reset = await User.find(req.params.id);
  res.json({ reset });
};
exports.logout = async (req, res) => {
  req.logout();
  req.flash("success_msg", "You are Successful");
  res.redirect(user / this.login);
};
