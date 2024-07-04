"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/", product_controller_1.productController.createProduct);
router.get("/", (req, res) => {
    const { searchTerm } = req.query;
    if (searchTerm) {
        product_controller_1.productController.searchProduct(req, res);
    }
    else {
        product_controller_1.productController.getProduct(req, res);
    }
});
router.get("/:productId", product_controller_1.productController.getSingleProduct);
router.delete("/:productId", product_controller_1.productController.deleteProduct);
router.put("/:productId", product_controller_1.productController.updateProduct);
exports.productRoute = router;
