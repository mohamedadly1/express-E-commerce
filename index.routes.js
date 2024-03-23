import { globalError } from "./src/middleware/globalErrorMiddleware.js"
import addressRouter from "./src/modules/address/address.routes.js"
import authRouter from "./src/modules/auth/auth.routes.js"
import brandRouter from "./src/modules/brand/brand.routes.js"
import cartRouter from "./src/modules/cart/cart.routes.js"
import categoryRouter from "./src/modules/category/category.routes.js"
import couponRouter from "./src/modules/coupon/coupon.routes.js"
import orderRouter from "./src/modules/order/order.routes.js"
import productRouter from "./src/modules/product/product.routes.js"
import reviewRouter from "./src/modules/review/review.routes.js"
import subCategoryRouter from "./src/modules/subcategory/subcategory.routes.js"
import userRouter from "./src/modules/user/user.routes.js"
import wishlistRouter from "./src/modules/wishlist/wishlist.routes.js"

export const AppRoutes = (app, express) =>{
    app.use(express.json())
    app.use('/uploads', express.static('uploads'))
    app.use('/api/v1/categories' , categoryRouter)
    app.use('/api/v1/subcategories' , subCategoryRouter)
    app.use('/api/v1/brands' , brandRouter)
    app.use('/api/v1/products' , productRouter)
    app.use('/api/v1/users' , userRouter)
    app.use('/api/v1/auth' , authRouter)
    app.use('/api/v1/reviews' , reviewRouter)
    app.use('/api/v1/wishlist' , wishlistRouter)
    app.use('/api/v1/addresses' , addressRouter)
    app.use('/api/v1/coupons' , couponRouter)
    app.use('/api/v1/cart' , cartRouter)
    app.use('/api/v1/order' , orderRouter)
   
    app.use('/', (req,res) => res.send('hello world'))
    
    app.use(globalError)
}