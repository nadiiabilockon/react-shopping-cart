var express = require('express');
var router = express.Router();
import { data } from "../data"

router.get('/:id', function (req, res, next) {
  const productId = req.params.id;
  const product = data.products.find(prod => prod._id === productId);
  if (product) {
    res.send(data.products.find(prod => prod._id === productId));
  } else {
    res.status(404).send({ msg: 'Product Not Found.' });
  }
});

router.get('/', function (req, res, next) {
  res.send(data.products);
});



module.exports = router;
