var express = require('express');
var router = express.Router();
import { data } from "../data"

router.get('/', function (req, res, next) {
  res.send(data.products);
});

module.exports = router;
