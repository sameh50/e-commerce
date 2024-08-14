import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { brands } from "../../../database/models/brandModel.js";
import { ApiFeatures } from "../../apiFeature.js";

//add brand

export const addbrand = catchError(async (req, res, next) => {
    req.body.logo = req.file.filename
    req.body.slug = slugify(req.body.name)
    const addbrand = await brands.create(req.body)
    if (addbrand) {
        return res.json({ msgg: 'add success' })
    } else {
        return next(new AppError('error in adding brand', (500)))
    }
})

//find all brand
export const findAll_brand = catchError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(brands.find(), req.query).pagination().fields().filter().sort().search()
    let findBrands = await apiFeatures.mongooseQuery
    if (findBrands) {

        return res.json({ msgg: 'find success', findBrands, page: apiFeatures.pageNumber })

    }
    else {
        return next(new AppError('error in finding brands', (500)))
    }
})
//find specific brand
export const findSpecific_brand = catchError(async (req, res, next) => {
    const findbyid = await brands.findById(req.params.id)
    if (findbyid) {
        return res.json({ msgg: 'find success' ,findbyid})
    } else {
        return console.log( next(new AppError('error in finding brand', (500))))
    }
})
//UPDATE specific brand
export const update_brand = catchError(async (req, res, next) => {
    if(req.file){
        req.body.logo = req.file.filename
    }
    if( req.body.name ){
        req.body.slug = slugify(req.body.name)
    }
    const updatebyid = await brands.findByIdAndUpdate(req.params.id,req.body)
    if (updatebyid) {
        return res.json({ msgg: 'update success'})
    } else {
        return next(new AppError('error in updating brand', (500)))
    }
})








//delete specific brand
export const delete_brand = catchError(async (req, res, next) => {
    const deletebyid = await brands.findByIdAndDelete(req.params.id)
    if (deletebyid) {
        return res.json({ msgg: 'delete success'})
    } else {
        return next(new AppError('error in delete brand', (500)))
    }
})