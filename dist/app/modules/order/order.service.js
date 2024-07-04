"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
// order create
const orderCreateIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // product exists validation
    const productExists = yield product_model_1.Product.exists({ _id: orderData.productId });
    if (!productExists) {
        throw new Error("Product not found");
    }
    const result = yield order_model_1.Order.create(orderData);
    return result;
});
// get all orders
const getOrderIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
// search orders by email address
const searchOrderIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(email, "i");
    const result = yield order_model_1.Order.find({ email: { $regex: regex } });
    return result;
});
exports.orderService = {
    orderCreateIntoDB,
    getOrderIntoDB,
    searchOrderIntoDB,
};
