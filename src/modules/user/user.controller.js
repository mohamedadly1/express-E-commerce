import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { deleteOne } from "../handlers/handlers.js";
import { userModel } from "../../../database/models/user.model.js";

const addUser = catchError(async (req, res, next) => {
  let user = new userModel(req.body); //new updates to user
  await user.save(); //save the user body after updating
  res.json({ message: "success", user:{name: user.name, email: user.email} });
});

const getAllUser = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .fields().sort().search().pagination().filter();
    
  let users = await apiFeatures.mongooseQuery; //find All products
  
  res.json({ message: "success", page: apiFeatures.pageNumber, users });
});

const getSingleUser = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id); //get user from id
  !user && res.status(404).json({ message: "user not found" }); //case not found
  user && res.json({ message: "success", user });
});

const updateUser = catchError(async (req, res, next) => {
  let user = await userModel.findByIdAndUpdate(req.params.id, req.body, 
  {new: true}); //get the product and update
  !user && res.status(404).json({ message: "user not found" }); //case not found product
  user && res.json({ message: "success", user }); //product after update
});

const deleteUser = deleteOne(userModel)


export {
  addUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
