
import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const coupon=new mongoose.Schema({

code:{
type:String,
unique:true,
required:true



},



expires:Date,
discount:{

    type:Number,
}





},{ timestamps: true ,versionkey:false})


export  const coupons=mongoose.model('coupon',coupon)