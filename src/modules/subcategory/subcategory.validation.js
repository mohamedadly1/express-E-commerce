import joi from "joi";

const addSubCategVal = joi.object({
  name: joi.string().min(2).max(100).required().trim(),
  category : joi.string().hex().length(24).required()
});

const updateSubCategVal = joi.object({
  name: joi.string().min(2).max(100).trim(),
  id: joi.string().hex().length(24).required(),
});

const paramsIdVal = joi.object({
   id : joi.string().length(24).hex().required()
});

export { addSubCategVal, paramsIdVal, updateSubCategVal };
