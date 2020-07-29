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

const deleteImgFromUpload = (img) => {
  let filePath = `./server/public/${img}`;
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
}

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

router.post("/", isAuth, isAdmin, upload.array('productImages'), async (req, res, next) => {
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

  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({ msg: "New Product Created", data: newProduct });
  } else {
    return res.status(500).send({ msg: "Error in Creating product" });
  }
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

    const deletedImages = req.body.deletedImages;

    // Check if delete one image or array and delete from uploads;
    if (deletedImages) {
      if (typeof deletedImages === 'string') {
        deleteImgFromUpload(deletedImages)
      } else {
        deletedImages.forEach(img => deleteImgFromUpload(img));
      }
    }

    const images = product.images.filter(img => deletedImages.indexOf(img) === -1);
    product.images = [...images, ...reqFiles];

    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
    }
  } else {
    return res.status(500).send({ message: ' Error in Updating Product.' });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  const deletedProduct = await Product.findById(req.params.id);

  if (deletedProduct) {
    deletedProduct.images.forEach(img => deleteImgFromUpload(img));

    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
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
