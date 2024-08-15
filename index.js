import express from 'express'
import bcrypt from 'bcrypt'
import { sendEmails } from './src/email/email.js';
import { dbconnection } from './database/dbConnection.js';
import { AppError } from './utilities/appError.js';
import { catchError } from './src/middleware/catchError.js';
import userRouter from './src/modules/user/user.routes.js';
import { validate } from './src/middleware/validate.js';
import { signupVal } from './src/modules/user/userValidation.js';
import messegesRouter from './src/modules/messege/messegeRoutes.js';
import categoryRouter from './src/modules/categories/categories.routs.js';
import SubCategoryRouter from './src/modules/subCategory/subCategoryRoutes.js';
import brandRouter from './src/modules/brands/brandsRoutes.js';
import productsRouter from './src/modules/products/productsRoutes.js';
import user_adminRouter from './src/modules/user-admin/user-admin.Routes.js';

import 'dotenv/config'
import reviewRouter from './src/modules/review/reviewRoutes.js';
import washlistRouter from './src/modules/wishlist/wishlistRoutes.js';
import addressRouter from './src/modules/address/addressRoutes.js';
import couponRouter from './src/modules/coupon/couponRoutes.js';
import cartsRouter from './src/modules/carts/cartsRouts.js';
import orderRouter from './src/modules/order/orderRouts.js';
import cors from 'cors'
import Stripe from 'stripe';
import { messege } from './database/models/messegeModel.js';
import { orders } from './database/models/orderModel.js';
import { carts } from './database/models/cartModel.js';
import { products } from './database/models/productModel.js';
const stripe = new Stripe(process.env.STRIPE_KEY);
process.on('uncaughtException', () => { // error in code
    console.log('code error');

})
const app = express();
const PORT = process.env.PORT || 3000;
app.use('/uploads', express.static('uploads')) // make server access folders directory
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,   and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
})
























































app.use("/", orderRouter)

app.use(express.json())

app.use("/auth", userRouter)
app.use("/", user_adminRouter)
app.use("/", categoryRouter)
app.use("/", SubCategoryRouter)
app.use("/", brandRouter)
app.use("/", messegesRouter)
app.use("/", productsRouter)
app.use("/", reviewRouter)
app.use("/", washlistRouter)
app.use("/", addressRouter)
app.use("/", couponRouter)
app.use("/", cartsRouter)







app.use(cors())






app.use('*', (req, res, next) => {

    next(new AppError(`route not found ${req.originalUrl}`, 404))

})










app.on('unhandledRejection', (err) => {
    console.log('error');

})

app.use((err, req, res, next) => {
    let code = err.statusCode
    console.log(err);
    res.status(code).json({ error: "error", message: err.message, code })
})
