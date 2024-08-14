import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { brands } from "../../../database/models/brandModel.js";
import { ApiFeatures } from "../../apiFeature.js";
import { users } from "../../../database/models/userModel.js";

//add user

export const adduser = catchError(async (req, res, next) => {


   let user=new users(req.body)
   await user.save()
   return res.json({ msgg: 'add success' })
})

//find all users(admin)
export const findAll_users = catchError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(users.find(), req.query).pagination().fields().filter().sort().search()
    let findusers = await apiFeatures.mongooseQuery
    if (findusers) {

        return res.json({ msgg: 'find success',findusers, page: apiFeatures.pageNumber })

    }
    else {
        return next(new AppError('error in finding users', (500)))
    }
})
//find specific user
export const findSpecific_user = catchError(async (req, res, next) => {
    const findbyid = await users.findById(req.params.id)
    if (findbyid) {
        return res.json({ msgg: 'find success', findbyid })
    } else {
        return console.log(next(new AppError('error in finding user', (500))))
    }
})
//UPDATE specific user
export const update_user = catchError(async (req, res, next) => {

    const updatebyid = await users.findByIdAndUpdate(req.params.id, req.body)
    if (updatebyid) {
        return res.json({ msgg: 'update success' })
    } else {
        return next(new AppError('error in updating user', (500)))
    }
})








//delete specific user
export const delete_user = catchError(async (req, res, next) => {
    const deletebyid = await users.findByIdAndDelete(req.params.id)
    if (deletebyid) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in delete user', (500)))
    }
})