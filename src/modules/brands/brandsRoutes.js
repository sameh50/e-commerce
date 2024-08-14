import { Router } from "express";
import { addbrand, delete_brand, findAll_brand, findSpecific_brand, update_brand } from "./brands.controller.js";
import { fileUploadSingle } from "../../fileUpload/fileUpload.js";
const brandRouter=Router()

//add brand
brandRouter.post('/add-brand',fileUploadSingle('logo','brands'),addbrand)
//find allbrands
brandRouter.get('/findAllbrands',findAll_brand)


//find specific brand
brandRouter.get('/findbrand/:id',findSpecific_brand)
// update brand
brandRouter.put('/update-brand/:id',fileUploadSingle('logo','brands'),update_brand)
// delete brand
brandRouter.delete('/delete-brand/:id',delete_brand)


export default brandRouter
