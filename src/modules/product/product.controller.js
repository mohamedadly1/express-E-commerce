import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/product.model.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { deleteOne } from "../handlers/handlers.js";

const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title); // slugify the name
  req.body.imgCover = req.files.imgCover[0].filename; //set file to imageCover
  req.body.images = req.files.images.map((img) => img.filename); //set file to images array

  let product = new productModel(req.body); //new updates to subCategory

  await product.save(); //save the subCategory body after updating
  res.json({ message: "success", product });
});

const getAllProduct = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(productModel.find({}), req.query)
    .fields().sort().search().pagination().filter();
    
  let products = await apiFeatures.mongooseQuery; //find All products
  res.json({ message: "success", page: apiFeatures.pageNumber, products });
});

const getSingleProduct = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id); //get product from id
  !product && res.status(404).json({ message: "product not found" }); //case not found
  product && res.json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name); //case name? slugify the name from body
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename; //case found files?set file to imageCover
  if (req.files.images) req.body.imges = req.files.images.map((img) => img.filename); //set file to images array

  let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //get the product and update
  !product && res.status(404).json({ message: "product not found" }); //case not found product
  product && res.json({ message: "success", product }); //product after update
});

const deleteProduct = deleteOne(productModel)


export {
  addProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
