"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Variant schema
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "variant type is required"),
    value: zod_1.z.string().min(1, "variant value is required"),
});
// Inventory schema
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Inventory quantity cannot be less than 0"),
    inStock: zod_1.z.boolean().default(true),
});
// Product schema
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .max(100, "Product name cannot be greater than 100")
        .min(1, "Product name is required"),
    description: zod_1.z.string().trim().min(1, "Product description is required"),
    price: zod_1.z.number().min(0, "Product price cannot be less than 0"),
    category: zod_1.z
        .string()
        .trim()
        .max(50, "Product category cannot be greater than 50")
        .min(1, "Product category is required"),
    tags: zod_1.z.array(zod_1.z
        .string()
        .trim()
        .max(50, "Product tags cannot be greater than 50")
        .min(1, "Product tags are required")),
    variants: zod_1.z
        .array(variantValidationSchema)
        .min(1, "Product variants are required"),
    inventory: inventoryValidationSchema.refine((val) => typeof val === "object", "Product inventory is required"),
    isDelete: zod_1.z.boolean().default(false),
});
exports.default = productValidationSchema;
