import { Router } from "express";
import { addreview, delete_review,  findAll_review,  findSpecific_review,  update_review } from "./review.controller.js";
import { fileUploadSingle } from "../../fileUpload/fileUpload.js";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
const reviewRouter=Router()

//addreview
reviewRouter.post('/add-review',protectedRoutes,allowedTo('user'),addreview)
//find allreviews
reviewRouter.get('/findAllreviews',findAll_review)


//find specificreview
reviewRouter.get('/findreview/:id',findSpecific_review)
// updatereview
reviewRouter.put('/update-review/:id',protectedRoutes,allowedTo('user'),update_review)
// deletereview
reviewRouter.delete('/delete-review/:id',protectedRoutes,allowedTo('user','admin'),delete_review)


export default reviewRouter
