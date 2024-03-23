import joi from "joi";

const addReviewVal = joi.object({
  text: joi.string().min(1).max(200).trim().required(),
  rate: joi.string().min(0).max(5).required(),
  product: joi.string().hex().length(24).required(),
});

const updateReviewVal = joi.object({
  id : joi.string().length(24).hex().required(),
  text: joi.string().min(1).max(200).trim(),
  rate: joi.string().min(0).max(5),
  product: joi.string().hex().length(24)
});

const paramsIdVal = joi.object({
   id : joi.string().length(24).hex().required()
});

export { addReviewVal, paramsIdVal, updateReviewVal };
