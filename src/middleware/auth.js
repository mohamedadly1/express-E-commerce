import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const auth = async (req, res, next) => {
  //1- token from headers
  const token = req.header("token");
  if (!token) return next(new AppError("Unauthorized", 401));
  //2- payload from verification token
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded?.id) return next(new AppError("Unauthorized", 401));//401 Unauthorized
  //3- get user info from server by id
  const user = await UserModel.findById(decoded.id);
  if (!user) return res.json({ message: "user not found" });

  req.user = user;
  next();
};
