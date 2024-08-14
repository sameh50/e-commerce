

import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const cart = new mongoose.Schema({

    user: {
        type: Types.ObjectId,
        ref: 'user'

    },

    cartItems: [
        
        {

        product: {
            type: Types.ObjectId,
            ref: 'products'},
        quantity: {
            type: Number,
            default: 1

        },
        price:Number

    }
],


totalCartPrice:Number,
discount:Number,
totalCartPriceAfterDiscount:Number,






}, { timestamps: true, versionkey: false })




export const carts = mongoose.model('Cart', cart)