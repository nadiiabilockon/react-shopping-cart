var express = require("express");
var router = express.Router();
const multer = require('multer');
import Product from "../models/productModel";
import { data } from "../data";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


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

router.post("/", upload.array("productImages", 10), async (req, res, next) => {
  console.log(req.files)
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
