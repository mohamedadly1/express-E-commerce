import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";


export const checkEmail = async (req, res, next) => {
  const find = await userModel.findOne({ email: req.body.email });
  if (find) return next(new AppError("email exist", 409))
  // 409 conflict

  next();
};
