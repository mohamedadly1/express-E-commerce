import joi from "joi";

const addUserVal = joi.object({
  name: joi.string().pattern(/[a-zA-Z]/).min(2).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
  confirmPassword: joi.valid(joi.ref("password")).required(),
  age: joi.number().integer().min(10).max(80).required()
});

const updateUserVal = joi.object({
  id: joi.string().hex().length(24),
  name: joi.string().pattern(/[a-zA-Z]/).min(2).max(20),
  email: joi.string().pattern(/^[a-z0-9A-Z]{2-50}@(gmail|yahoo).com$/).email(),
  password: joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  confirmPassword: joi.valid(joi.ref("password")).required(),
  age: joi.number().integer().min(10).max(80),
  role: joi.string().valid('user' , 'admin')
});

const paramsIdVal = joi.object({
   id : joi.string().length(24).hex().required()
});

export { addUserVal, paramsIdVal, updateUserVal };


//.pattern(/^[a-z0-9A-Z]{2-50}@(gmail|yahoo).com$/)