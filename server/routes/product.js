var express = require("express");
var router = express.Router();
const multer = require('multer');
import Product from "../models/productModel";

const date = new Date().toISOString().replace(/:/g, '-');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, date + '_' + file.originalname)
  }
})

const upload = multer({ storage: storage });

router.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found." });
  }
});

router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/", upload.array('productImages'), (req, res, next) => {
  const reqFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    reqFiles.push("/images/" + req.files[i].filename)
  }

  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    countInStock: req.body.countInStock,
    images: reqFiles
  });

  product.save(function (err, product) {
    if (err) {
      return res.status(500).send({ msg: "Error in Creating product" });
    }
    return res.status(201).send({ msg: "New Product Created", data: product });
  })
});

module.exports = router;
