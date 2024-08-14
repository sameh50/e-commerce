import { Router } from "express";
import { add_category, delete_category, findAll_category, findSpecific_category, update_category } from "./categories.controller.js";
import { fileUploadSingle } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { categoryValidate } from "./categoryValidation.js";
import SubCategoryRouter from "../subCategory/subCategoryRoutes.js";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
const categoryRouter = Router()
//merge params 
categoryRouter.use('/categories/:id/subcategories', SubCategoryRouter)

//add category
categoryRouter.post('/add-category', protectedRoutes,allowedTo('admin'), fileUploadSingle('image', 'category'),  add_category)
//find allcategory
categoryRouter.get('/findAllcategories', findAll_category)


//find specific category
categoryRouter.get('/findCategory/:id', findSpecific_category)
// update
categoryRouter.patch('/update-category/:id',protectedRoutes ,allowedTo('admin'),fileUploadSingle('image', 'category'), update_category)
// delete
categoryRouter.delete('/delete-category/:id',protectedRoutes, allowedTo('admin'),delete_category)









export default categoryRouter