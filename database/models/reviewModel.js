
import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const review=new mongoose.Schema({

comment:{
type:String,
minLength:[2,'too short review']



},
user:{

    type: mongoose.Types.ObjectId,
ref:'user'
},
product:{

    type: mongoose.Types.ObjectId,
ref:'products'
},
rate:{

    type:Number,
    min:0,
    max:5,
    required:true
}





},{ timestamps: true ,versionkey:false})


export  const reviews=mongoose.model('review',review)