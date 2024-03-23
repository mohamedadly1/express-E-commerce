import joi from "joi";

const addProductVal = joi.object({
  title: joi.string().min(2).max(300).required().trim(),
  description: joi.string().min(10).max(1500).required().trim(),
  price: joi.number().min(0).required(),
  priceAfterDiscount: joi.number().min(0).optional(),
  quantity: joi.number().min(0).optional(),
  category: joi.string().length(24).hex().required(),
  subcategory: joi.string().length(24).hex().required(),
  brand: joi.string().length(24).hex().required(),
  createdBy: joi.string().length(24).hex().optional(),
 
  imgCover: joi.array().items(joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg','image/png','image/jpg').required(),
    size: joi.number().max(5242880).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required()
  })).required(),
  images: joi.array().items(joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg','image/png','image/jpg').required(),
    size: joi.number().max(5242880).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required()
  })).required()

});

const updateProductVal = joi.object({
  id: joi.string().hex().length(24).required(),
  title: joi.string().min(2).max(300).trim(),
  description: joi.string().min(10).max(1500).trim(),
  price: joi.number().min(0),
  priceAfterDiscount: joi.number().min(0).optional(),
  quantity: joi.number().min(0).optional(),
  category: joi.string().length(24).hex(),
  subcategory: joi.string().length(24).hex(),
  brand: joi.string().length(24).hex(),
  createdBy: joi.string().length(24).hex().optional(),

  imgCover: joi.array().items(joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg','image/png','image/jpg').required(),
    size: joi.number().max(5242880).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required()
  })),
  images: joi.array().items(joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg','image/png','image/jpg').required(),
    size: joi.number().max(5242880).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required()
  }))
});

const paramsIdVal = joi.object({
   id : joi.string().length(24).hex().required()
});

export { addProductVal, paramsIdVal, updateProductVal };
