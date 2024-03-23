import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/AppError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id
  const isReviewExist = await reviewModel.findOne({ user: req.user._id , product: req.body.product})
  if(isReviewExist) return next(new AppError('you already have a review'))

  let review = new reviewModel(req.body); //new updates to review
  await review.save(); //save the review body after updating
  res.json({ message: "success", review });
});

const getAllReviews = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find({}), req.query)
  .fields().sort().search().pagination().filter();
  
let reviews = await apiFeatures.mongooseQuery; //find All reviews
res.json({ message: "success", page: apiFeatures.pageNumber, reviews });
});

const getSingleReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findById(req.params.id);
  !review && res.status(404).json({ message: "review not found" });
  review && res.json({ message: "success", review });
});

const updateReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findOneAndUpdate({_id: req.params.id , user: req.user._id},
    req.body, { new: true }); //get the review and update

  !review && res.status(404).json({ message: "review not found" }); //case not found review
  review && res.json({ message: "success", review }); //review after update
});

const deleteReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findOneAndDelete({_id: req.params.id , user: req.user._id})
  !review && res.status(404).json({ message: "review not found" }); //case not found review
  review && res.json({ message: "success", review }); //review after update
});


export {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
