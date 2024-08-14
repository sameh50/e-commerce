import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { Subcategories, Subcategory } from "../../../database/models/subcategoryModel.js";
import { ApiFeatures } from "../../apiFeature.js";



//add Subcategory

export const addSub_category = catchError(async (req, res, next) => {

    req.body.slug = slugify(req.body.name)
    const addSubCategory = await Subcategories.create(req.body)
    if (addSubCategory) {
        return res.json({ msgg: 'add success' })
    } else {
        return next(new AppError('error in adding subcategory', (500)))
    }
})

//find all subcategory
export const findAll_subcategory = catchError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(Subcategories.find(), req.query).pagination().fields().filter().sort().search()
    let findsubcategory = await apiFeatures.mongooseQuery
    if (findsubcategory) {

        return res.json({ msgg: 'find success', findsubcategory, page: apiFeatures.pageNumber })

    }
    else {
        return next(new AppError('error in finding subcategory', (500)))
    }

})
//find specific subcategory
export const findSpecific_subcategory = catchError(async (req, res, next) => {
    const findbyid = await Subcategories.findById(req.params.id)
    if (findbyid) {
        return res.json({ msgg: 'find success' ,findbyid})
    } else {
        return console.log( next(new AppError('error in finding subcategory', (500))))
    }
})
//UPDATE specific subcategory
export const update_subcategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const updatebyid = await Subcategories.findByIdAndUpdate(req.params.id,req.body)
    if (updatebyid) {
        return res.json({ msgg: 'update success'})
    } else {
        return next(new AppError('error in updating subcategory', (500)))
    }
})








//delete specific subcategory
export const delete_subcategory = catchError(async (req, res, next) => {
    const deletebyid = await Subcategories.findByIdAndDelete(req.params.id)
    if (deletebyid) {
        return res.json({ msgg: 'delete success'})
    } else {
        return next(new AppError('error in delete subcategory', (500)))
    }
})