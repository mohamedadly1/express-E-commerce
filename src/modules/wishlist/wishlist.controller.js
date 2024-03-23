import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";

const addToWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findByIdAndUpdate(req.user._id, 
    {$addToSet:{wishlist:req.body.product}},{ new: true }).populate('wishlist'); 

  !wishlist && res.status(404).json({ message: "wishlist not found" }); //case not found wishlist
  wishlist && res.json({ message: "success", wishlist: wishlist.wishlist }); //wishlist after update
});

const removeFromWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findByIdAndUpdate(req.user._id, 
    {$pull: {wishlist:req.params.id}},{ new: true }).populate('wishlist'); 

  !wishlist && res.status(404).json({ message: "wishlist not found" }); //case not found wishlist
  wishlist && res.json({ message: "success", wishlist: wishlist.wishlist }); //wishlist after update
});

const getLoggedWishlist = catchError(async (req, res, next) => {
  let {wishlist} = await userModel.findById(req.user._id).populate('wishlist')

  !wishlist && res.status(404).json({ message: "wishlist not found" }); //case not found wishlist
  wishlist && res.json({ message: "success", wishlist }); //wishlist after update
});

export { addToWishlist, removeFromWishlist, getLoggedWishlist };
