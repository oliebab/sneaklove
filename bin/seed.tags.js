require("dotenv").config();
require("./../config/mongodb");
const TagModel = require("./../models/Tag");

const tags = [{ label: "Sport" }, { label: "Sexy" }, { label: "Fancy" }];

(async function insertTags() {
    try {
      await TagModel.deleteMany(); // empty the styles db collection
      const inserted = await TagModel.insertMany(tags); // insert docs in db
      console.log(`seed tags done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  }
)();
