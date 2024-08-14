import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { signinVal, signupVal } from "./userValidation.js";
import { changePassword, signin, userRegistration, userVerification } from "./user.controller.js";
import { EmailExist } from "../../middleware/EmailExist.js";

const userRouter = Router()

//1. User Registration

userRouter.post('/user-registration',EmailExist ,validate(signupVal), userRegistration)

//verification



userRouter.post('/userVerification', userVerification)


//2. sigin

userRouter.post('/user-signin', /* validate(signinVal) */ signin)

//3. change password

userRouter.patch('/changePassword', changePassword)








export default userRouter