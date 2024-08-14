import mongoose, { Model, Schema } from 'mongoose'
export const dbconnection = mongoose.connect('mongodb+srv://sameh-tharwat:moha504@cluster0.kur7c.mongodb.net/e-commerce_online').then(() => {
    console.log('db connected success');
}).catch(() => {

    'db connection faild'
})