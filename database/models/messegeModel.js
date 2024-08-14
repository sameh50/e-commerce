
import mongoose, { Model, Schema, Types, model, now } from 'mongoose'


export const messege = new Schema({

    content: {
        type: String,


    },
    recieverID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }



})


export const messeges = model('messeges', messege)