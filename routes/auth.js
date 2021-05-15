const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

router.post("/signin", async (req, res, next) => {
    console.log("inside route signin !!!!!");
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
      console.log("user not found !!!!")
    req.flash("error", "Invalid Credentials");
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
        console.log("wrong password !!!!!")

      req.flash("error", "Invalid Credentials");
      res.redirect("/signin");
    } else {
        console.log("signed in !!!!!!")

      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;
      req.flash("Success", "Wouhou Success!");
      res.redirect("/");
    }
  }
  
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });
    console.log("inside signup !!!!")
    if (foundUser) {
        console.log("found user !!!! already registered")
      req.flash("warning", "email already registered");
      res.redirect("/");
    } else {
        console.log("success registered !!!!!")
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      req.flash("success", "congrats! You are registered");
      res.redirect("/");
    }
  } catch (err) {
    var errorMsg = "";
    for (field in err.errors) {
      errorMsg += err.errors[field].message + "\n";
    }
    req.flash("error", errorMsg);
    res.redirect("/signup");
  }
});

module.exports = router;
