import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../services/fileUploads/upload.js";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "./product.controller.js";
import {
  addProductVal,
  paramsIdVal,
  updateProductVal,
} from "./product.validation.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]), validation(addProductVal),addProduct)
  .get(getAllProduct);

productRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleProduct)
  .put(
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]), validation(updateProductVal), updateProduct)
  .delete(validation(paramsIdVal), deleteProduct);

export default productRouter;
