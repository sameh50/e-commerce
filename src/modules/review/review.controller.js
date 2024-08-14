import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { reviews } from "../../../database/models/reviewModel.js";
import { ApiFeatures } from "../../apiFeature.js";

//add review

export const addreview = catchError(async (req, res, next) => {
    req.body.user = req.USER._id // get user id from token payload so he must be login user
    let isExist = await reviews.findOne({ user: req.USER._id, product: req.body.product })// every user should have one review on same product
    if (isExist) return next(new AppError('user already review this product', (500)))

    const addreview = await reviews.create(req.body)
    if (addreview) {
        return res.json({ msgg: 'add success' })
    } else {
        return next(new AppError('error in adding review', (500)))
    }
})

//find all review
export const findAll_review = catchError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(reviews.find().populate('user'), req.query).pagination().fields().filter().sort().search()
    let findreviews = await apiFeatures.mongooseQuery
    if (findreviews) {

        return res.json({ msgg: 'find success', findreviews, page: apiFeatures.pageNumber })

    }
    else {
        return next(new AppError('error in finding reviews', (500)))
    }
})
//find specific review
export const findSpecific_review = catchError(async (req, res, next) => {
    const findbyid = await reviews.findById(req.params.id)
    if (findbyid) {
        return res.json({ msgg: 'find success', findbyid })
    } else {
        return console.log(next(new AppError('error in finding review', (500))))
    }
})
//UPDATE specific review
export const update_review = catchError(async (req, res, next) => {
    // only the user who review can update his review
    const updatebyid = await reviews.findOneAndUpdate({ _id: req.params.id, user: req.USER._id }, req.body, { new: true })
    if (updatebyid) {
        return res.json({ msgg: 'update success' })
    } else {
        return next(new AppError('error in updating review', (500)))
    }
})








//delete specific review
export const delete_review = catchError(async (req, res, next) => {
    const deletebyid = await reviews.findOneAndDelete({ _id: req.params.id, user: req.USER._id }, req.body, { new: true })
    if (deletebyid) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in delete review', (500)))
    }
})