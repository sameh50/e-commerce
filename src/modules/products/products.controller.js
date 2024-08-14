import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { products } from "../../../database/models/productModel.js";
import { ApiFeatures } from "../../apiFeature.js";

//add product

export const addproduct = catchError(async (req, res, next) => {
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map((img) => img.filename)

    req.body.slug = slugify(req.body.title)
    const addproduct = await products.create(req.body)
    if (addproduct) {
        return res.json({ msgg: 'add success' })
    } else {
        return next(new AppError('error in adding product', (500)))
    }
})

//find all product
export const findAll_product = catchError(async (req, res, next) => {
    // ****************pagination***************
    const apiFeatures = new ApiFeatures(products.find(), req.query).pagination().fields().filter().sort().search()
    let prodcts = await apiFeatures.mongooseQuery
    return res.json({ msgg: 'find success', prodcts, page: apiFeatures.pageNumber })

})
//find specific product
export const findSpecific_product = catchError(async (req, res, next) => {
    const findbyid = await products.findById(req.params.id).populate('myReviews')
    if (findbyid) {
        return res.json({ msgg: 'find success', findbyid })
    } else {
        return console.log(next(new AppError('error in finding product', (500))))
    }
})
//UPDATE specific product
export const update_product = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const updatebyid = await products.findByIdAndUpdate(req.params.id, req.body)
    if (updatebyid) {
        return res.json({ msgg: 'update success' })
    } else {
        return next(new AppError('error in updating product', (500)))
    }
})








//delete specific product
export const delete_product = catchError(async (req, res, next) => {
    const deletebyid = await products.findByIdAndDelete(req.params.id)
    if (deletebyid) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in delete product', (500)))
    }
})