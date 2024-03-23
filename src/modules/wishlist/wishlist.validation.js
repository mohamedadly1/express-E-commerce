import joi from "joi";

const addwishlistVal = joi.object({
  product: joi.string().hex().length(24).required(),
});

const updatewishlistVal = joi.object({
  product: joi.string().hex().length(24).required(),
});

const paramsIdVal = joi.object({
   id : joi.string().length(24).hex().required()
});

export { addwishlistVal, paramsIdVal, updatewishlistVal };
