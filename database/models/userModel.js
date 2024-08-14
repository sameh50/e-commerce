
import mongoose, { Model, Schema, Types, model, now } from 'mongoose'
import bcrypt from 'bcrypt'


export const user = new Schema({

    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        required: true,



    },

    confirmEmail: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
        ,

      

    },
    otp: { type: String },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'


    },
    passwordChangedAt: Date,

wishlist:[{
type:mongoose.Types.ObjectId,
ref:'products'


}],
adresses:[{city:String,
    phone:String,
    street:String
}]


})

// hashing by hook method

user.pre('save', function () {


    this.password = bcrypt.hashSync(this.password, 8)

})
user.pre('findOneAndUpdate', function () { 


    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)

})

export const users = model('user', user)