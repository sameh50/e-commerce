import { Router } from "express";
import {  addwishlist, getAllWishlist, removeFromWishlist,  } from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
const washlistRouter=Router()

//add to washlist
washlistRouter.post('/add-washlist',protectedRoutes,allowedTo('user'),addwishlist)
//remove from washlist
washlistRouter.delete('/remove-washlist/:id',protectedRoutes,allowedTo('user','admin'),removeFromWishlist)

//get all washlist of user
washlistRouter.get('/get-washlist/',protectedRoutes,allowedTo('user','admin'),getAllWishlist)



export default washlistRouter
