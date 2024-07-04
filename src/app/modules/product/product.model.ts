import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, "variant type is required"],
  },
  value: {
    type: String,
    required: [true, "variant value is required"],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "Inventory quantity is required"],
    min: [0, "Inventory quantity cannot be less than 0"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Inventory inStock status is required"],
    default: true,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    trim: true,
    required: [true, "Product name is required"],
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "product price cannot be less than 0"],
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Product category is required"],
    maxlength: [50, "product category cannot be greater than 50"],
  },
  tags: {
    type: [String],
    trim: true,
    required: [true, "Product tags are required"],
    maxlength: [50, "product tags cannot be greater than 50"],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Product variants are required"],
  },
  inventory: {
    type: inventorySchema,
    required: [true, "Product inventory is required"],
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

// query middleware
productSchema.pre("find", function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

export const Product = model<TProduct>("Product", productSchema);
