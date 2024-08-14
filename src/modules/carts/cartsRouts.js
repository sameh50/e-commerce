import { Router } from "express";
import { addcart, ApplyCoupon, clearUserCart, getUserCart, removeItemsCart, updateQuantity } from "./carts.controller.js";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
;

const cartsRouter = Router()

//add to cart
cartsRouter.post('/add-cart', protectedRoutes, allowedTo('user'), addcart)

//update quantity in  cart
cartsRouter.put('/update-cart/:id', protectedRoutes, allowedTo('user'), updateQuantity)
//remove items from cart
cartsRouter.delete('/remove-cart/:id', protectedRoutes, allowedTo('user'), removeItemsCart)
//get user cart
cartsRouter.get('/get-cart', protectedRoutes, allowedTo('user'), getUserCart)
//clear user cart
cartsRouter.delete('/clear-cart', protectedRoutes, allowedTo('user'), clearUserCart)
//apply coupon on  cart
cartsRouter.post('/applyCoupon-cart', protectedRoutes, allowedTo('user'), ApplyCoupon)


export default cartsRouter
