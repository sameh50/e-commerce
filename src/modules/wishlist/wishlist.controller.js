import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { brands } from "../../../database/models/brandModel.js";
import { ApiFeatures } from "../../apiFeature.js";
import { users } from "../../../database/models/userModel.js";

//add to wishlist

export const addwishlist = catchError(async (req, res, next) => {

    let addwishlist = await users.findByIdAndUpdate(req.USER._id, { $addToSet: { wishlist: req.body.product } })
    if (addwishlist) {
        return res.json({ msgg: 'add success' })
    } else {
        return next(new AppError('error in adding wishlist', (500)))
    }
})
//remove from wishlist

export const removeFromWishlist = catchError(async (req, res, next) => {

    let removefromWishlist = await users.findByIdAndUpdate(req.USER._id, { $pull: { wishlist:{_id: req.params.id }} })
    if (removefromWishlist) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in deleting wishlist', (500)))
    }
})

//get all  wishlist of user

export const getAllWishlist = catchError(async (req, res, next) => {

    let getallWishlist = await users.findById(req.USER._id).populate('wishlist')
    if (getallWishlist) {
        return res.json({ msgg: 'find success', getallWishlist })
    } else {
        return next(new AppError('error in finding wishlist', (500)))
    }
})

