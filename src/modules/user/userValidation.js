import joi from 'joi'
export const signupVal = joi.object({
    name: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),//Minimum eight characters, at least one letter and one number:


})
export const signinVal = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),//Minimum eight characters, at least one letter and one number:
})