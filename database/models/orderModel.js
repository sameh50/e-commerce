

import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const order = new mongoose.Schema({

    user: {
        type: Types.ObjectId,
        ref: 'user'

    },

    orderItems: [

        {

            product: {
                type: Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
            },
            price: Number

        }
    ],


    totalOrderPrice: Number,

    shippingAddresses: {
        city: String,
        street: String,
        phone: String,
    },
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'



    },
    isPaid: {
        type: Boolean,
        default: false


    },

    paidAt:Date,

    isDeliverd: {
        type: Boolean,
        default: false
    },
    deliverdAt:Date






}, { timestamps: true, versionkey: false })




export const orders = mongoose.model('Order', order)