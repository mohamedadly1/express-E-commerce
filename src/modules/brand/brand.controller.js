import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handlers.js";

const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name); // slugify the name
  req.body.logo = req.file.filename; //set file to image
  let brand = new brandModel(req.body);//new updates to subCategory
  await brand.save(); //save the subCategory body after updating
  res.json({ message: "success", brand });
});

const getAllBrand = catchError(async (req, res, next) => {
  let brands = await brandModel.find({}); //find All Brands
  res.json({ message: "success", brands });
});

const getSingleBrand = catchError(async (req, res, next) => {
  let brand = await brandModel.findById(req.params.id); //get brand from id
  !brand && res.status(404).json({ message: "Brand not found" }); //case not found 
  brand && res.json({ message: "success", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name); //case name? slugify the name from body 
  if (req.file) req.body.logo = req.file.filename; //case found file? set to image

  let brand = await brandModel.findByIdAndUpdate(req.params.id,
    req.body, { new: true }); //get the brand and update
  
  !brand && res.status(404).json({ message: "Brand not found" }); //case not found brand
  brand && res.json({ message: "success", brand }); //brand after update
});

const deleteBrand =  deleteOne(brandModel)

export {
  addBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
