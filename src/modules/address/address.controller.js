import slugify from "slugify";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { brands } from "../../../database/models/brandModel.js";
import { ApiFeatures } from "../../apiFeature.js";
import { users } from "../../../database/models/userModel.js";

//add to adress

export const addAdresses = catchError(async (req, res, next) => {

    let addsdresse = await users.findByIdAndUpdate(req.USER._id, { $push: { adresses: req.body} })
    if (addsdresse) {
        return res.json({ msgg: 'add success' ,addsdresse})
    } else {
        return next(new AppError('error in adding adress', (500)))
    }
})
//remove from adress

export const removeFromaddress = catchError(async (req, res, next) => {

    let removefromadress = await users.findByIdAndUpdate(req.USER._id, { $pull: { adresses:{_id: req.params.id }} })
    if (removefromadress) {
        return res.json({ msgg: 'delete success' })
    } else {
        return next(new AppError('error in deleting adress', (500)))
    }
})

//get all  adress of user

export const getAlladress = catchError(async (req, res, next) => {

    let getalladress = await users.findById(req.USER._id)
    if (getalladress) {
        return res.json({ msgg: 'find success', getalladress })
    } else {
        return next(new AppError('error in finding adress', (500)))
    }
})

