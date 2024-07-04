import { z } from "zod";

// Variant schema
const variantValidationSchema = z.object({
  type: z.string().min(1, "variant type is required"),
  value: z.string().min(1, "variant value is required"),
});

// Inventory schema
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, "Inventory quantity cannot be less than 0")
    .nonnegative("Inventory quantity is required"),
  inStock: z
    .boolean()
    .default(true)
    .refine(
      (val) => typeof val === "boolean",
      "Inventory inStock status is required"
    ),
});

// Product schema
const productValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, "Product name cannot be greater than 100")
    .min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  price: z
    .number()
    .min(0, "Product price cannot be less than 0")
    .refine((val) => typeof val === "number", "Product price is required"),
  category: z
    .string()
    .trim()
    .max(50, "Product category cannot be greater than 50")
    .min(1, "Product category is required"),
  tags: z.array(
    z
      .string()
      .trim()
      .max(50, "Product tags cannot be greater than 50")
      .min(1, "Product tags are required")
  ),
  variants: z
    .array(variantValidationSchema)
    .min(1, "Product variants are required"),
  inventory: inventoryValidationSchema.refine(
    (val) => typeof val === "object",
    "Product inventory is required"
  ),
  isDelete: z.boolean().default(false),
});

export default productValidationSchema;
