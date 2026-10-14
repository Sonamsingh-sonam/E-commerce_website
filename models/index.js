const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");

  let items = [];
  user.cart.forEach(function (product) {
    let found = items.find(function (i) {
      return i.product._id.toString() === product._id.toString();
    });
    if (found) {
      found.qty += 1;
    } else {
      items.push({ product: product, qty: 1 });
    }
  });

  res.render("cart", { items });
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product added to cart");
  res.redirect("/shop");
});

router.get("/increase/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  res.redirect("/cart");
});

router.get("/decrease/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let index = user.cart.findIndex(function (id) {
    return id.toString() === req.params.productid;
  });
  if (index !== -1) {
    user.cart.splice(index, 1);
  }
  await user.save();
  res.redirect("/cart");
});

router.get("/removefromcart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.pull(req.params.productid);
  await user.save();
  res.redirect("/cart");
});

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;