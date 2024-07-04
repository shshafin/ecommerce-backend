import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, "Order email is required"],
    unique: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
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

export const Order = model<TOrder>("Order", orderSchema);
