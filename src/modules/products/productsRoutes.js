import { Router } from "express";
import { addproduct, delete_product, findAll_product, findSpecific_product, update_product } from "./products.controller.js";
import { fileUploadMany } from "../../fileUpload/fileUpload.js";

const productsRouter=Router()
//add product
productsRouter.post('/add-product',fileUploadMany([{name:'imageCover',maxCount:1},{  name:'images',maxCount:8   }],'products'),addproduct)
//find allproducts
productsRouter.get('/findAllproducts',findAll_product)


//find specific product
productsRouter.get('/findproduct/:id',findSpecific_product)
// update product
productsRouter.put('/update-product/:id',fileUploadMany([{name:'imageCover',maxCount:1},{  name:'images',maxCount:8   }],'products'),update_product)
// delete product
productsRouter.delete('/delete-product/:id',delete_product)


export default productsRouter
