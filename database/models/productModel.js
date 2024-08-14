

import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const product = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        required: true,
        trim: true,
        //    minLength: [2, 'too short name']



    },
    slug: {

        type: String,
        lowercase: true,
        required: true
    },

    description: {
        type: String,
        required: true,
        minLength: 30,
        maxLength: 1000

    },
    imageCover: String,



    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        min: 0
    },


    sold: Number,
    stock: {
        type: Number,
        min: 0


    },

    category: {

        type: mongoose.Types.ObjectId,
        ref: 'categories'

    },

    Subcategory: {

        type: mongoose.Types.ObjectId,
        ref: 'Subcategories'

    },
    rateAvg: {
        type: Number,
        min: 0,
        max: 5


    },
    rateCount: Number,

    brand: {

        type: mongoose.Types.ObjectId,
        ref: 'brands'

    },




    createdBy: {

        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true, versionkey: false ,toJSON:{virtuals:true}}


)

// virtual populate
product.virtual('myReviews',{

ref:'review',
localField:'_id' ,
foreignField:'product' 

                


}
)


product.post('init', function (doc) {

  if( doc.imageCover )  doc.imageCover = process.env.BASE_url+"products/" + doc.imageCover

 if(doc.images )   doc.images = doc.images.map((img) => process.env.BASE_url+"products/" + img)


})




export const products = mongoose.model('products', product)