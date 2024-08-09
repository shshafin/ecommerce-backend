import { Request, Response } from "express";
import { productService } from "./product.service";
import { productValidator } from "./product.validation";

// create product //
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const zodValidation =
      productValidator.productValidationSchema.parse(productData);

    const result = await productService.createProductIntoDB(zodValidation);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error,
    });
  }
};

// all product //
const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProductIntoDB();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

// single product //
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.getSingleProductIntoDB(productId);

    // if product not found
    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Product not found",
        data: null,
      });
    }

    // if product found
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

// delete product //
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.deleteProductIntoDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

// update product //
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;

    const result = await productService.updateProductIntoDB(
      productId,
      updatedProductData
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

// search product //
const searchProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await productService.searchProductIntoDB(
      searchTerm as string
    );

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: error,
    });
  }
};

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
};
