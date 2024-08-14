import { Router } from "express";
import { addMesseges, deleteMesseges, readMesseges } from "./messegerController.js";
import { verifyToken } from "../../middleware/verifyToken.js";


const messegesRouter=Router()

//1. add message

messegesRouter.post('/add-messege',addMesseges)


//2. Read message

messegesRouter.get('/read-messege',verifyToken,readMesseges)
//3. delete message

messegesRouter.delete('/delete-messege/:id',verifyToken,deleteMesseges)



export default messegesRouter