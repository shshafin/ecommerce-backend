import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.post("/", productController.createProduct);

router.get("/", (req, res) => {
  const { searchTerm } = req.query;

  if (searchTerm) {
    productController.searchProduct(req, res);
  } else {
    productController.getProduct(req, res);
  }
});

router.get("/:productId", productController.getSingleProduct);

router.delete("/:productId", productController.deleteProduct);

router.put("/:productId", productController.updateProduct);

export const productRoute = router;
