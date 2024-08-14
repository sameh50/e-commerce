import { users } from "../../database/models/userModel.js"
import { AppError } from "../../utilities/appError.js"

export const EmailExist=async(req,res,next)=>{


let isExist=await users.findOne({email:req.body.email})
if(isExist){

return next(new AppError('email already exist',409))

}

next()

}