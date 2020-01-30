const express = require("express");
const fileUpload = require("express-fileUpload");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//enable nodemailer
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const async = require("async");
const crypto = require("crypto");
const waterfall = require("async-waterfall");

//enable json support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//include routes
app.use("/user", require("./Routes/user"));

//enable file upload
app.use("/file", express.static(__dirname + "public"));
app.use(fileUpload());

module.exports = app;
