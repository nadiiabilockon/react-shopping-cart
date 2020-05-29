import express from "express";
import multer from "multer";
import fs from "fs";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

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

router.post("/", isAuth, isAdmin, upload.array('productImages'), (req, res, next) => {
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

router.put("/:id", isAuth, isAdmin, upload.array('productImages'), async (req, res, next) => {
  const productId = req.params.id;
  const reqFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    reqFiles.push("/images/" + req.files[i].filename)
  }

  const product = await Product.findOne({ _id: productId })

  if (product) {
    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.images = [...product.images, ...reqFiles];

    product.save(function (err, product) {
      if (err) {
        return res.status(500).send({ msg: "Error in Creating product" });
      }
      return res.status(201).send({ msg: "New Product Created", data: product });
    })
  } else {
    res.status(404).send({ msg: "Product Not Found." });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  const deletedProduct = await Product.findById(req.params.id);

  if (deletedProduct) {
    deletedProduct.images.forEach(img => {
      const filePath = `./server/public/${img}`;
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
    });
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

module.exports = router;
