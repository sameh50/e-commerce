import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { brands } from "../../../database/models/brandModel.js";
import { ApiFeatures } from "../../apiFeature.js";
import { users } from "../../../database/models/userModel.js";
import { coupons } from "../../../database/models/couponModel.js";

//add to coupon

export const addcoupones = catchError(async (req, res, next) => {
let isExist=await coupons.findOne({code:req.body.code})
if(isExist){
    return next(new AppError('coupon already exist', (500)))
}
    let addcoupon = await coupons.create(req.body)
    if (addcoupon) {
        return res.json({ msgg: 'add success' ,addcoupon})
    } else {
        return next(new AppError('error in adding coupon', (500)))
    }
})
//update coupon

export const updatecoupones = catchError(async (req, res, next) => {

    let updatecoupon = await coupons.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if (updatecoupon) {
        return res.json({ msgg: 'update success' ,updatecoupon})
    } else {
        return next(new AppError('error in updating coupon', (500)))
    }
})




//remove from coupon

export const removeFromcoupones = catchError(async (req, res, next) => {

    let removefromcoupon = await coupons.findByIdAndDelete(req.params.id)
    if (removefromcoupon) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in deleting coupon', (500)))
    }
})

//get all  coupons 

export const getAllcoupons = catchError(async (req, res, next) => {

    let getallcoupon = await coupons.find()
    if (getallcoupon) {
        return res.json({ msgg: 'find success', getallcoupon })
    } else {
        return next(new AppError('error in finding coupon', (500)))
    }
})

