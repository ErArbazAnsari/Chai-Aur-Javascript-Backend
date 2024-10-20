import Product from "./product.models";

const mongoose = require("mongoose");

// mini model
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        require: true,
    },
});

// main model
const orderSchema = new mongoose.Schema(
    {
        orderPrice: {
            type: Number,
            require: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        orderItems: {
            type: [orderItemSchema],
        },
        address: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
