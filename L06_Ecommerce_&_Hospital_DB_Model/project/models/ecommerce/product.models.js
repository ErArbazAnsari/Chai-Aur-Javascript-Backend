const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            require: true,
        },
        name: {
            require: true,
            type: String,
        },
        productImage: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
        },
        stock: {
            default: 0,
            type: Number,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
