import { Router } from "express";
import {  addAdresses, getAlladress, removeFromaddress  } from "./address.controller.js";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
const addressRouter=Router()

//add to address
addressRouter.post('/add-address',protectedRoutes,allowedTo('user'),addAdresses)
//remove from address
addressRouter.delete('/remove-address/:id',protectedRoutes,allowedTo('user','admin'),removeFromaddress)
//get all from address
addressRouter.get('/get-address/',protectedRoutes,allowedTo('user','admin'),getAlladress)



export default addressRouter
