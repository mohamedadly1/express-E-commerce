import joi from "joi";

const addCouponVal = joi.object({
  code: joi.string().min(1).max(200).required().trim(),
  discount: joi.number().min(0).required(),
  expires: joi.date().required(),
});

const updateCouponVal = joi.object({
  id: joi.string().length(24).hex().required(),
  code: joi.string().min(1).max(200).trim(),
  discount: joi.number().min(0),
  expires: joi.date(),
});

const paramsIdVal = joi.object({
  id: joi.string().length(24).hex().required(),
});

export { addCouponVal, paramsIdVal, updateCouponVal };
