require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker"); // fetch the model to validate our user document before insertion (in database)

const sneakers = [
  {
    name: "Adidas",
    ref: "Stan Smith",
    size: "42",
    description: "This is the latest",
    price: 120,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Chaussure_Stan_Smith_Blanc_FX5502_01_standard.jpg",
    category: "men",
    // id_tags: { type: Schema.Types.ObjectId, ref: "tag" },
  },
  {
    name: "Adidas",
    ref: "Stan Smith",
    size: "40",
    description: "This is the latest",
    price: 120,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Chaussure_Stan_Smith_Blanc_FX5502_01_standard.jpg",
    category: "women",
    // id_tags: { type: Schema.Types.ObjectId, ref: "tag" },
  },
  {
    name: "Adidas",
    ref: "Stan Smith",
    size: "34",
    description: "This is the latest",
    price: 120,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Chaussure_Stan_Smith_Blanc_FX5502_01_standard.jpg",
    category: "kids",
    // id_tags: { type: Schema.Types.ObjectId, ref: "tag" },
  }
];

console.log(sneakers);

(async function insertSneakers() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
    console.log(
      `seed sneakers done : ${inserted.length} documents inserted !`
    );
  } catch (err) {
    console.error(err);
  }
})();
