import express from 'express';
import { addwishlistVal, paramsIdVal } from './wishlist.validation.js';
import { validation } from '../../middleware/validation.js';
import {addToWishlist, getLoggedWishlist, removeFromWishlist} from './wishlist.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const wishlistRouter = express.Router();

wishlistRouter
.route('/')
.patch(protectedRoutes, allowedTo('user'),validation(addwishlistVal), addToWishlist)
.get(protectedRoutes, allowedTo('user'),getLoggedWishlist)

wishlistRouter
.route('/:id')
.delete(protectedRoutes, allowedTo('user','admin'), validation(paramsIdVal), removeFromWishlist)
// .put(protectedRoutes, allowedTo('user'), validation(updateReviewVal) ,updateReview)

export default wishlistRouter;