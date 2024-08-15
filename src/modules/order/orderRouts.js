import { Router } from "express";
import { allowedTo, protectedRoutes } from "../user/user.controller.js";
import { creatCashOrder, CreateCardorder, CreateCheckOutSession, getAllrOrders, getUserOrders } from "./order.controller.js";
import express from 'express'
const orderRouter = Router()

//add order cash
orderRouter.post('/add-order/:id', protectedRoutes, allowedTo('user'), creatCashOrder)
//get user orders
orderRouter.get('/user-order', protectedRoutes, allowedTo('user'), getUserOrders)
//get all orders
orderRouter.get('/all-order', protectedRoutes, allowedTo('admin'), getAllrOrders)
//Check out session
orderRouter.get('/Check-out/:id', protectedRoutes, allowedTo('user'), CreateCheckOutSession)

orderRouter.post('/webhook', express.raw({ type: 'application/json' }), CreateCardorder)
export default orderRouter
