import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", orderController.createOrder);

router.get("/", (req, res) => {
  const { email } = req.query;

  if (email) {
    orderController.searchOrder(req, res);
  } else {
    orderController.getOrder(req, res);
  }
});

export const orderRoute = router;
