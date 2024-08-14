import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const Subcategory=new mongoose.Schema({

name:{
type:String,
unique:[true,'name is required'],
required: true,
trim:true,
minLength:[2,'too short name']



},
slug:{

    type:String,
    lowercase:true,
    required:true
},
category:{
  type: mongoose.Types.ObjectId,
  ref:'categories'


},
createdBy:{

    type: mongoose.Types.ObjectId,
ref:'user'
}





},{ timestamps: true ,versionkey:false})


export  const Subcategories=mongoose.model('Subcategories',Subcategory)