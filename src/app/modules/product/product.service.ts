import { Types } from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// get all products
const getProductIntoDB = async () => {
  const result = await Product.find();
  return result;
};

// get single product
const getSingleProductIntoDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);
  const result = await Product.aggregate([{ $match: { _id: objectId } }]);
  return result;
};

// delete product
const deleteProductIntoDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);
  const result = await Product.deleteOne({ _id: objectId }, { isDelete: true });
  return result;
};

// update product
const updateProductIntoDB = async (
  id: string,
  updatedProductData: TProduct
) => {
  const objectId = new Types.ObjectId(id);
  const result = await Product.updateOne({ _id: objectId }, updatedProductData);
  return result;
};

// search product
const searchProductIntoDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  });

  return result;
};

export const productService = {
  createProductIntoDB,
  getProductIntoDB,
  getSingleProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
  searchProductIntoDB,
};
