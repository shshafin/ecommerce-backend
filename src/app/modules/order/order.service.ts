import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// order create
const orderCreateIntoDB = async (orderData: TOrder) => {
  // product exists validation
  const productExists = await Product.exists({ _id: orderData.productId });

  if (!productExists) {
    throw new Error("Product not found");
  }

  const result = await Order.create(orderData);
  return result;
};

// get all orders
const getOrderIntoDB = async () => {
  const result = await Order.find();
  return result;
};

// search orders by email address
const searchOrderIntoDB = async (email: string) => {
  const regex = new RegExp(email, "i");

  const result = await Order.find({ email: { $regex: regex } });
  return result;
};

export const orderService = {
  orderCreateIntoDB,
  getOrderIntoDB,
  searchOrderIntoDB,
};
