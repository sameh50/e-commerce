import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const category = new mongoose.Schema({

    name: {
        type: String,
        unique: [true, 'name is required'],
        required: true,
        trim: true,
        minLength: [2, 'too short name']



    },
    slug: {

        type: String,
        lowercase: true,
        required: true
    },
    image: {
        type: String

    },
    createdBy: {

        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true, versionkey: false }


)


category.post('init', function (doc) {

    doc.image = process.env.BASE_url + "category/" + doc.image

})

export const categories = mongoose.model('categories', category)