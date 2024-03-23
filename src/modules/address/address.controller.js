import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";

const addToAddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(req.user._id, {$addToSet: {addresses: req.body}},
    { new: true })

  !address && res.status(404).json({ message: "address not found" }); //case not found address
  address && res.json({ message: "success", address: address.addresses }); //address after update
});

const removeFromAddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(req.user._id, 
    {$pull: {addresses:{_id:req.params.id}}},{ new: true }) 

  !address && res.status(404).json({ message: "address not found" }); //case not found address
  address && res.json({ message: "success", address: address.addresses }); //address after update
});

const getLoggedAddress = catchError(async (req, res, next) => {
  let {addresses} = await userModel.findById(req.user._id)

  addresses && res.json({ message: "success", addresses }); //address after update
});

export { addToAddress, removeFromAddress, getLoggedAddress };
