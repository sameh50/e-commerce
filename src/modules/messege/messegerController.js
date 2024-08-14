
import { messeges } from "../../../database/models/messegeModel.js";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken"

//1. add message

export const addMesseges = catchError(async (req, res, next) => {
    const { content, recieverID } = req.body
    const newMesseges = await messeges.insertMany({ content, recieverID })

    if (newMesseges) {


        return res.json({ msg: "add success", newMesseges })
    } else {
        return next(new AppError('error in sending messege', (500)))



    }







})







//2. Read message

export const readMesseges = catchError(async (req, res, next) => {

    const readmessege = await messeges.find().populate('recieverID', ['-password', '-confirmEmail', '-otp', '-__v)'])


    return res.json({ msg: "get success", readmessege })
}




)




//2. delete message

export const deleteMesseges = catchError(async (req, res, next) => {
    const { content, recieverID } = req.body
    const deletemassege = await messeges.deleteOne({ _id: req.params.id })


    return res.json({ msg: "delete success", deletemassege })
})



