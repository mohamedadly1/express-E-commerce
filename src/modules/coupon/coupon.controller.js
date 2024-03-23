import { couponModel } from "../../../database/models/coupon.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { deleteOne } from "../handlers/handlers.js";


const addToCoupon = catchError(async (req, res, next) => {
 
  const isCouponExist = await couponModel.findOne({code: req.body.code})
  if(isCouponExist) return next(new AppError('Coupon already exists'))

  let coupon = new couponModel(req.body); //new updates to coupon
  await coupon.save(); //save the coupon body after updating
  res.json({ message: "success", coupon });
});

const getAllCoupons = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find({}), req.query)
  .fields().sort().search().pagination().filter();
  
let coupons = await apiFeatures.mongooseQuery; //find All coupons
res.json({ message: "success", page: apiFeatures.pageNumber, coupons });
});

const getSingleCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findById(req.params.id);
  !coupon && res.status(404).json({ message: "coupon not found" });
  coupon && res.json({ message: "success", coupon });
});

const updateCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findByIdAndUpdate(req.params.id ,
    req.body, { new: true }); //get the coupon and update

  !coupon && res.status(404).json({ message: "coupon not found" }); //case not found coupon
  coupon && res.json({ message: "success", coupon }); //coupon after update
});

const deleteCoupon = deleteOne(couponModel)


export { addToCoupon, updateCoupon, deleteCoupon, getSingleCoupon, getAllCoupons };
