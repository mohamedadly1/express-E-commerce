import joi from "joi";

const addCartVal = joi.object({
 product:joi.string().length(24).hex().required(),
 quantity:joi.number().integer().options({ convert:false })
});

const updateQTYVal = joi.object({
  id : joi.string().length(24).hex().required(),
  quantity:joi.number().integer().options({ convert:false }).required(),
});

const paramsIdVal = joi.object({
   id : joi.string().length(24).hex().required()
});

export { addCartVal, paramsIdVal, updateQTYVal };
