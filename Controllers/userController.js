const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const async = require("async");
const crypto = require("crypto");
const waterfall = require("async-waterfall");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const secret = require("secret");
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
  async.waterfall(
    [
      callback => {
        crypto.randomBytes(20, (err, buf) => {
          const random = buf.toString("hex");
          callback(err, random);
        });
      },
      (random, callback) => {
        let check = User.findOne({ email: req.body.email });
        try {
          const { passwordResetToken, passwordResetExpires } = req.body;
          if (!User) throw "Invalid Email";
          reset = new User({ passwordResetToken, passwordResetExpires });
          reset.passwordResetToken = random;
          // Allocated 1 hour time for reset. After that token becomes invalid
          reset.passwordResetExpires = Date.now + 60 * 60 * 1000;
          reset.save();
        } catch (err) {
          res.status(400).json({
            message: err
          });
        }
      },
      //Send email to user
      (random, reset, callback) => {
        const smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          know: {
            user: secret.know.user,
            pass: secret.know.password
          }
        });
        const mailOption = {
          to: user.email,
          from: "BUSE" + "<" + secret.know.user + ">",
          subject: "BUSE Application Password Reset Token",
          text:
            "You have requested for password reset token.\n\n" +
            "Please click on the link to complete the process:\n\n" +
            "http://localhost/reset/" +
            random +
            "\n\n"
        };
        smtpTransport.sendMail(mailOption, (err, res) => {
          req.flash(
            "info",
            "A Passwort reset token has been sent to " + user.email
          );
          return callback(err, user);
        });
      }
    ],
    err => {
      if (err) {
        return next(err);
      }
      res.redirect("/forgot");
    }
  );
};
exports.reset = async (req, res) => {
  try {
    const { passwordResetExpires, passwordResetToken } = req.body;
    user.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: {
        $gt: Date.now()
      }
    });
    if (!reset.passwordResetExpires)
      throw "Password reset token has exprired or is Invalid";
    res.redirect("/reset" + req.params.token);
    res.render("/user/forgot", {
      title: "Reset your password",
      message: errors,
      hasErrors: errors.length > 0
    });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
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
