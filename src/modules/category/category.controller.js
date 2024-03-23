import { categoryModel } from "../../../database/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";

const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let category = new categoryModel(req.body);
  await category.save();
  res.json({ message: "success", category });
});

const getAllCategory = catchError(async (req, res, next) => {
  let categories = await categoryModel.find({});
  res.json({ message: "success", categories });
});

const getSingleCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findById(req.params.id);
  !category && res.status(404).json({ message: "category not found" });
  category && res.json({ message: "success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name); //case name? slugify the name from body 
  if (req.file) req.body.image = req.file.filename; //case found file? set to image

  let category = await categoryModel.findByIdAndUpdate(req.params.id,
    req.body, { new: true }); //get the category and update
  
  !category && res.status(404).json({ message: "category not found" }); //case not found category
  category && res.json({ message: "success", category }); //category after update
});

const deleteCategory = deleteOne(categoryModel)

export {
  addCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
