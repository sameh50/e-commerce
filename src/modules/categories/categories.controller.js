import slugify from "slugify";
import { categories } from "../../../database/models/categoryModel.js";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../apiFeature.js";


//add category

export const add_category = catchError(async (req, res, next) => {

    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename

    const addCategory = await categories.create(req.body)
    if (addCategory) {
        return res.json({ msgg: 'add success' })
    } else {
        return next(new AppError('error in adding category', (500)))
    }
})

//find all category
export const findAll_category = catchError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(categories.find(), req.query).pagination().fields().filter().sort().search()
    let findcategories = await apiFeatures.mongooseQuery
    if (findcategories) {

        return res.json({ msgg: 'find success', findcategories, page: apiFeatures.pageNumber })

    }




    else {
        return next(new AppError('error in finding category', (500)))
    }
})
//find specific category
export const findSpecific_category = catchError(async (req, res, next) => {
    const findbyid = await categories.findById(req.params.id)
    if (findbyid) {
        return res.json({ msgg: 'find success', findbyid })
    } else {
        return console.log(next(new AppError('error in finding category', (500))))
    }
})
//UPDATE specific category
export const update_category = catchError(async (req, res, next) => {
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }

    if (req.file) {
        req.body.image = req.file.filename
    }
    const updatebyid = await categories.findByIdAndUpdate(req.params.id, req.body)
    if (updatebyid) {
        return res.json({ msgg: 'update success' })
    } else {
        return next(new AppError('error in finding category', (500)))
    }
})








//delete specific category
export const delete_category = catchError(async (req, res, next) => {
    const deletebyid = await categories.findByIdAndDelete(req.params.id)
    if (deletebyid) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in delete category', (500)))
    }
})