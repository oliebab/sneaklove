const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
  {
    name: String,
    ref: String,
    size: Number,
    description: String,
    price: Number,
    image: String,
    category: { type: String, enum: ['men', 'women', 'kids'] },
    id_tags: { type: Schema.Types.ObjectId, ref: "tag" }, 
    },
  { timestamps: true }
);

const SneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = SneakerModel;