"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = void 0;
const zod_1 = require("zod");
// Variant schema
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Variant type is required"),
    value: zod_1.z.string().min(1, "Variant value is required"),
});
// Inventory schema
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .min(0, "Inventory quantity cannot be less than 0")
        .nonnegative("Inventory quantity is required"),
    inStock: zod_1.z.boolean().default(true),
});
// Product schema
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .max(100, "Product name cannot be greater than 100 characters")
        .min(1, "Product name is required"),
    description: zod_1.z.string().trim().min(1, "Product description is required"),
    price: zod_1.z
        .number()
        .min(0, "Product price cannot be less than 0")
        .refine((val) => typeof val === "number", "Product price is required"),
    category: zod_1.z
        .string()
        .trim()
        .max(50, "Product category cannot be greater than 50 characters")
        .min(1, "Product category is required"),
    tags: zod_1.z.array(zod_1.z
        .string()
        .trim()
        .max(50, "Product tags cannot be greater than 50 characters")
        .min(1, "Product tags are required")),
    variants: zod_1.z
        .array(variantValidationSchema)
        .min(1, "At least one product variant is required"),
    inventory: inventoryValidationSchema,
    isDelete: zod_1.z.boolean().default(false),
});
const productUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .max(100, "Product name cannot be greater than 100 characters")
        .min(1, "Product name is required")
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .min(1, "Product description is required")
        .optional(),
    price: zod_1.z
        .number()
        .min(0, "Product price cannot be less than 0")
        .refine((val) => typeof val === "number", "Product price is required")
        .optional(),
    category: zod_1.z
        .string()
        .trim()
        .max(50, "Product category cannot be greater than 50 characters")
        .min(1, "Product category is required")
        .optional(),
    tags: zod_1.z
        .array(zod_1.z
        .string()
        .trim()
        .max(50, "Product tags cannot be greater than 50 characters")
        .min(1, "Product tags are required"))
        .optional(),
    variants: zod_1.z
        .array(variantValidationSchema)
        .min(1, "At least one product variant is required")
        .optional(),
    inventory: inventoryValidationSchema.optional(),
    isDelete: zod_1.z.boolean().default(false).optional(),
});
exports.productValidator = {
    productValidationSchema,
    productUpdateValidationSchema,
};
