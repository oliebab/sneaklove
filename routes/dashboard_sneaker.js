const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");
const UserModel = require("../models/User");




// router.get("/prod-add", (req, res, next) => res.render("products_add"));

router.get("/prod-add", async (req, res, next) => {
  console.log("prod add !!!!")
  // const sneakers = await SneakerModel.find();
  const tags = await TagModel.find();
  res.render("products_add", { tags });
});
  
  // //GET - sneaker form
  
  // // POST - create one sneaker

  router.post("/prod-add", async (req, res, next) => {
    console.log("POST SNEAK !!!!")
      const newSneaker = {...req.body};
      try {
        await SneakerModel.create(newSneaker);
        res.redirect("/sneakers/collection");
      } catch (err) {
        next(err);
      }
  });
  

module.exports = router;
