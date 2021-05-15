const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    label: String
    },
  { timestamps: true }
);

const TagModel = mongoose.model("tag", tagSchema);

module.exports = TagModel;