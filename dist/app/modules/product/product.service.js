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
exports.productService = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("./product.model");
// create product
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
// get all products
const getProductIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
// get single product
const getSingleProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    const result = yield product_model_1.Product.aggregate([{ $match: { _id: objectId } }]);
    return result;
});
// delete product
const deleteProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    const result = yield product_model_1.Product.deleteOne({ _id: objectId }, { isDelete: true });
    return result;
});
// update product
const updateProductIntoDB = (id, updatedProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    const result = yield product_model_1.Product.updateOne({ _id: objectId }, updatedProductData);
    return result;
});
// search product
const searchProductIntoDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, "i");
    const result = yield product_model_1.Product.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
        ],
    });
    return result;
});
exports.productService = {
    createProductIntoDB,
    getProductIntoDB,
    getSingleProductIntoDB,
    deleteProductIntoDB,
    updateProductIntoDB,
    searchProductIntoDB,
};
