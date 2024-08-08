import { Request, Response } from "express";
import { orderService } from "./order.service";

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await orderService.orderCreateIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "product not found",
      data: null,
    });
  }
};

// get all orders
const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrderIntoDB();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order not found",
      data: null,
    });
  }
};

// search order by email address
const searchOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await orderService.searchOrderIntoDB(email as string);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order not found",
      error: error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
  searchOrder,
};
