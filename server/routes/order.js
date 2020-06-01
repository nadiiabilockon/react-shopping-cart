import express from "express";
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.post("/", isAuth, async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });

    newOrder.save(function (err, order) {
        if (err) {
            return res.status(500).send({ msg: "Error in Creating Order" });
        }
        return res.status(201).send({ msg: "New Order Created", data: order });
    })
});

module.exports = router;