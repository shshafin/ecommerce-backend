import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";
import { orderRoute } from "./app/modules/order/order.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("this is my awesome assignment");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next();
});

export default app;
