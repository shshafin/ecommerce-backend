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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
// create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Order: orderData } = req.body;
        const result = yield order_service_1.orderService.orderCreateIntoDB(orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "product not found",
            data: null,
        });
    }
});
// get all orders
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getOrderIntoDB();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "order not found",
            data: null,
        });
    }
});
// search order by email address
const searchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.orderService.searchOrderIntoDB(email);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for the provided email",
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "order not found",
            error: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getOrder,
    searchOrder,
};
