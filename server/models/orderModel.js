import mongoose from "mongoose";

const shippingSchema = {
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
};

const paymentSchema = {
    paymentMethod: {
        type: String,
        required: true
    },
};

const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderItems: [orderItemSchema],
        shipping: shippingSchema,
        payment: paymentSchema,
        itemsPrice: {
            type: Number
        },
        taxPrice: {
            type: Number
        },
        shippingPrice: {
            type: Number
        },
        totalPrice: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
