const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const File = mongoose.model("File");
const formidable = require("formidable");
const bodyParser = require("body-parser");

exports.addFile = async (req, res) => {
  let file;
  let uploadPath;
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      throw "No files were uploaded.";
    res.send("req.files >>>", req.files); // eslint-disable-line
    file = req.files.sampleFile;
    uploadPath = __dirname + "/uploads/" + file.name;
    await file.save();
    res.json({ message: "File added successfully to " + uploadPath });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
};

exports.getFile = async (req, res) => {
  const file = await File.find();
  res.json({ file });
};
