import joi from "joi"

export const categoryValidate = joi.object({
    name: joi.string().min(1).max(40).required(),
    image: joi.string().required()


})