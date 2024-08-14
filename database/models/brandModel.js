
import mongoose, { Model, Schema, Types, model, now } from 'mongoose'

export const brand = new mongoose.Schema({

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
  logo: {
    type: String,


  },
  createdBy: {

    type: mongoose.Types.ObjectId,
    ref: 'user'
  }





}, { timestamps: true, versionkey: false })



brand.post('init', function (doc) {

  doc.logo = process.env.BASE_url+"brands/" + doc.logo

})

export const brands = mongoose.model('brand', brand)