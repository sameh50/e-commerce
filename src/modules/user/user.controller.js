
import { users } from "../../../database/models/userModel.js";
import { AppError } from "../../../utilities/appError.js";
import { sendEmails } from "../../email/email.js";
import { otpGenerator } from "../../email/emailHTML.js";
import { catchError } from "../../middleware/catchError.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


//1. User Registration

export const userRegistration = catchError(async (req, res, next) => {
    const { name, email, password } = req.body

    sendEmails(email)
    let Adduser = new users({ name, email, password, otp: otpGenerator })
    jwt.sign({ userID: Adduser._id, username: Adduser.name, email: Adduser.email }, process.env.JWT_KEY, (err, token) => {

        res.json({ messege: "add success", token })
    })

    await Adduser.save()




    return res.json({ msg: "add success", Adduser })
})


// user verification


export const userVerification = catchError(async (req, res, next) => {
    const { username, email, password, otp } = req.body
    let verification = await users.findOneAndUpdate({ otp }, { confirmEmail: true })
    if (verification) {

        return res.json({ msg: "verify complete", })


    }

    else {


        return next(new AppError('not verified user', (409)))

    }





})


// 2.sign in user




export const signin = catchError(async (req, res, next) => {
    const { username, email, password, otp } = req.body


    let login = await users.findOne({ email })

    if (login && bcrypt.compareSync(password, login.password)) {
        if (login.confirmEmail == true) {

            jwt.sign({ userID: login._id, username: login.username, email: login.email }, process.env.JWT_KEY, (err, token) => {

                res.json({ messege: "log in success", token })
            })




        } else {

            res.json({ messege: "not verified account" })

        }
    } else { return next(new AppError('email or password invalid', (401))) }

}







)
// 3.change user password




export const changePassword = catchError(async (req, res, next) => {
    const { username, email, password, otp } = req.body


    let login = await users.findOne({ email })

    if (login && bcrypt.compareSync(req.body.oldPassword, login.password)) {
        if (login.confirmEmail == true) {
            await users.findOneAndUpdate({ email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
            jwt.sign({ userID: login._id, username: login.username, email: login.email }, process.env.JWT_KEY, (err, token) => {

                res.json({ messege: "password updated", token })
            })




        } else {

            res.json({ messege: "not verified account" })

        }
    } else { return next(new AppError('email or password invalid', (401))) }

}







)
//4. protected routes


export const protectedRoutes = catchError(async (req, res, next) => {
    let userpayload = null
    let { token } = req.headers
    if (!token) {
        return next(new AppError('token not found', (401)))



    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) { return next(new AppError(err, (401))) } else {
                userpayload = payload

            }


        })

        var USER = await users.findById(userpayload.userID)
        if (!USER) return next(new AppError('user not found', (401)))
        if (USER.passwordChangedAt) {
            let time = parseInt(user.passwordChangedAt.getTime() / 1000)
            if (time > userpayload.iat) return next(new AppError('token not valid.... try login again', (401)))
        }
    }

    req.USER= USER
   
    next()
})


//5. authorization


export const allowedTo = (...roles) => {
    
    return catchError(async (req, res, next) => {
      
        if (roles.includes(req.USER.role)) {

            return next()



        } else {


            return next(new AppError('not authorized to access this endpoint', (401)))


        }





    })




}
