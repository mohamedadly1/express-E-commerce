import express from 'express';
import { addCouponVal, paramsIdVal, updateCouponVal } from './coupon.validation.js';
import { addToCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from './coupon.controller.js';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const couponRouter = express.Router();
couponRouter.use(protectedRoutes, allowedTo('admin'))

 couponRouter
.route('/')
.post(validation(addCouponVal), addToCoupon)
.get(getAllCoupons)

 couponRouter
 .route('/:id')
 .get(validation(paramsIdVal), getSingleCoupon)
 .put(validation(updateCouponVal) ,updateCoupon)
 .delete(validation(paramsIdVal), deleteCoupon)

export default couponRouter;