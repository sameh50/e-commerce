import { Router } from "express";
import {  addcoupones, getAllcoupons, removeFromcoupones, updatecoupones,   } from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
const couponRouter=Router()

//add to coupon
couponRouter.post('/add-coupon',protectedRoutes,allowedTo('admin'),addcoupones)
//update coupon
couponRouter.patch('/update-coupon/:id',protectedRoutes,allowedTo('admin'),updatecoupones)

//remove from coupon
couponRouter.delete('/remove-coupon/:id',protectedRoutes,allowedTo('admin'),removeFromcoupones)
//get all from coupon
couponRouter.get('/get-coupon/',protectedRoutes,allowedTo('admin'),getAllcoupons)



export default couponRouter
