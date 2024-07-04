"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Order email is required"],
        unique: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Order productId is required"],
    },
    price: {
        type: Number,
        required: [true, "Order price is required"],
        min: [0, "Order price cannot be less than 0"],
    },
    quantity: {
        type: Number,
        required: [true, "Order quantity is required"],
        min: [1, "Order quantity cannot be less than 1"],
    },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
