import { AppError } from "../../utilities/appError.js"
import { signupVal } from "../modules/user/userValidation.js"

export const validate = (schema) => {
    return (req, res, next) => {

        let { error } = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false })
        if (req.file) {
          
            let { error } = schema.validate({ image: req.file }, { abortEarly: false })

        }
        if (!error) {
            next()
        } else {
            let errMsgs = []

            error.details.forEach(element => {
                errMsgs.push(element.message)

            });
            next(new AppError(errMsgs, 401))
        }


    }



}