const mongoose = require("mongoose");
//create Schema
const fuzzySearchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Title is requiered"
    },
    description: {
      type: String,
      trim: true,
      required: "Description is required"
    },
    city: {
      type: String
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
fuzzySearchSchema.plugin(fuzzySearchSchema, { fileds: [title, city] });
module.exports = mongoose.model("Search", fuzzySearchSchema);
