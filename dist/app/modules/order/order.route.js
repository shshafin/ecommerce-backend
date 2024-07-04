"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/", order_controller_1.orderController.createOrder);
router.get("/", (req, res) => {
    const { email } = req.query;
    if (email) {
        order_controller_1.orderController.searchOrder(req, res);
    }
    else {
        order_controller_1.orderController.getOrder(req, res);
    }
});
exports.orderRoute = router;
