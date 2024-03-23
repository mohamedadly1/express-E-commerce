import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { couponModel } from "../../../database/models/coupon.model.js";

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;

  if (cart.discount) {
    let totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  }
};

const addToCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product);
  if (!product) return next(new AppError("Product not found"));
  if (req.body.quantity > product.quantity)
    return next(new AppError("out of stock"));

  let cartExist = await cartModel.findOne({ user: req.user._id });
  if (!cartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [
        {
          ...req.body,
          price: product.price,
        },
      ],
    });
    calcTotalPrice(cart);
    await cart.save();
    !cart && res.status(404).json({ message: "cart not found" });
    cart && res.json({ message: "success", cart });
  } else {
    let item = cartExist.cartItems.find(
      (item) => item.product == req.body.product
    );

    if (item) {
      if (item.quantity >= product.quantity)
        return next(new AppError("out of stock"));
      item.quantity += req.body.quantity || 1;
    } else
      cartExist.cartItems.push({
        ...req.body,
        price: product.price,
      });

    calcTotalPrice(cartExist);

    await cartExist.save();

    res.status(404).json({ message: "success", cartExist });
  }
});

const updateQTY = catchError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  !cart && res.status(404).json({ message: "cart not found" }); //case not found cart

  let item = cart.cartItems.find((item) => item._id == req.params.id);
  if (!item) return next(new AppError("item not found"));
  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();

  cart && res.json({ message: "success", cart }); //cart after update
});

const removeItemCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  calcTotalPrice(cart);
  await cart.save();
  !cart && res.status(404).json({ message: "cart not found" });
  cart && res.json({ message: "success", cart });
});

const getLoggedCart = catchError(async (req, res, next) => {
  let cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  !cart && res.status(404).json({ message: "cart not found" }); //case not found cart
  cart && res.json({ message: "success", cart });
});

const clearUserCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndDelete({ user: req.user._id });
  !cart && res.status(404).json({ message: "cart not found" }); //case not found cart
  cart && res.json({ message: "success", cart });
});

const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.coupon,
    expires: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("invalid coupon", 401));

  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 404));
  let totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.discount = coupon.discount;
  await cart.save();
  res.json({ message: "success", cart });
});

export {
  addToCart,
  updateQTY,
  removeItemCart,
  getLoggedCart,
  clearUserCart,
  applyCoupon,
};
