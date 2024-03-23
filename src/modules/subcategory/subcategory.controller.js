import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { subCategoryModel } from "../../../database/models/subCategory.model.js";
import { deleteOne } from "../handlers/handlers.js";

const addSubCategory = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name); //case name? slugify the name from body 
  if (req.file) req.body.image = req.file.filename; //case found file? set to image
  
  let subCategory = new subCategoryModel(req.body); //new updates to subCategory
  await subCategory.save(); //save the subCategory body after updating
  res.json({ message: "success", subCategory });
});

const getAllSubCategory = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.category) {
    filterObj.category = req.params.category
  }
  let subCategories = await subCategoryModel.find(filterObj).populate('category');
  res.json({ message: "success", subCategories });
});

const getSingleSubCategory = catchError(async (req, res, next) => {
  let subCategory = await subCategoryModel.findById(req.params.id);
  !subCategory && res.status(404).json({ message: "category not found" });
  subCategory && res.json({ message: "success", subCategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name); //case name? slugify the name from body 
  if (req.file) req.body.image = req.file.filename; //case found file? set to image

  let subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,
    req.body, { new: true }); //get the category and update
  
  !subCategory && res.status(404).json({ message: "category not found" }); //case not found category
  subCategory && res.json({ message: "success", subCategory }); //category after update
});

const deleteSubCategory = deleteOne(subCategoryModel)


export {
  addSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
