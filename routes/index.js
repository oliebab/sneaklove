const express = require("express");
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");
const UserModel = require("../models/User");
const router = express.Router();

router.get("/", (req, res, next) => res.render("index"));

//GET - all sneakers
router.get("/sneakers/:cat", async (req, res, next) => {
  const query = req.params.cat !== "collection" ? { category: req.params.cat } : {};
  try {
    res.render("products", {
      sneakers: await SneakerModel.find(query),
    });
  } catch (err) {
    next(err);
  }
});

//GET - one sneaker
router.get("/one-prod/:id", function (req, res, next) {
  console.log(req.params.id);
  SneakerModel.findById(req.params.id)
    .then((dbResult) => {
      res.render("one_product", {
        sneaker: dbResult,
      });
    })
    .catch((dbErr) => next(dbErr));
});

module.exports = router;
