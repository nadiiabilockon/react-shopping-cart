var express = require("express");
var router = express.Router();
import Product from "../models/productModel";
import { data } from "../data";

router.get("/:id", function (req, res, next) {
  const productId = req.params.id;
  const product = data.products.find((prod) => prod._id === productId);
  if (product) {
    res.send(data.products.find((prod) => prod._id === productId));
  } else {
    res.status(404).send({ msg: "Product Not Found." });
  }
});

router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/", async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    countInStock: req.body.countInStock,
    images: req.body.images,
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error in Creating product" });
});

module.exports = router;
