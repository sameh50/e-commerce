import { Router } from "express";
import { addSub_category, delete_subcategory, findAll_subcategory, findSpecific_subcategory, update_subcategory } from "./subCategory.conroller.js";

const SubCategoryRouter=Router()


//add sub-category
SubCategoryRouter.post('/add-sub-category',addSub_category)
//find allcategory
SubCategoryRouter.get('/findAllSubcategories',findAll_subcategory)


//find specific sub-category
SubCategoryRouter.get('/findSubCategory/:id',findSpecific_subcategory)
// update
SubCategoryRouter.put('/update-sub-category/:id',update_subcategory)
// delete
SubCategoryRouter.delete('/delete-sub-category/:id',delete_subcategory)


export default SubCategoryRouter