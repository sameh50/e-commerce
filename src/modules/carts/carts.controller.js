

import { cart, carts } from "../../../database/models/cartModel.js";
import { coupons } from "../../../database/models/couponModel.js";
import { products } from "../../../database/models/productModel.js";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";


function totalcartprice(isCartExist) {
    isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev, ele) => prev += ele.price * ele.quantity, 0)
    if (isCartExist.discount) {
        isCartExist.totalCartPriceAfterDiscount = isCartExist.totalCartPrice - (isCartExist.totalCartPrice * isCartExist.discount) / 100
    }

}

//add to cart

export const addcart = catchError(async (req, res, next) => {

    // check for product exist
    let product = await products.findById(req.body.product)
    if (!product) return next(new AppError('product not found', (401)))
    req.body.price = product.price
    if (req.body.quantity > product.stock) return next(new AppError('product sold out', (401)))
    let isCartExist = await carts.findOne({ user: req.USER._id })
    if (!isCartExist) { // new cart
        let addtocart = new carts({ user: req.USER._id, cartItems: [req.body] })
        totalcartprice(addtocart)
        await addtocart.save()
        res.json({ messege: "cart added", addtocart })
        // already have cart

    } else {
        // cheack if already have products in cart
        let item = isCartExist.cartItems.find(ele => ele.product == req.body.product)





        // if product = the new added product .... then increase quantity of this product
        if (item) {
            // icrease quantity
            item.quantity = item.quantity + parseInt(req.body.quantity || 1)
            // if no more quantity in stock of product
            if (item.quantity > product.stock) return next(new AppError('product sold out', (401)))

        }
        //if another new product
        if (!item) isCartExist.cartItems.push(req.body)

        // calc total cart price


        totalcartprice(isCartExist)



        await isCartExist.save()
        res.json({ messege: "quantity added", isCartExist })




    }

})


// update cart quantity
export const updateQuantity = catchError(async (req, res, next) => {

    let cart = await carts.findOne({ user: req.USER._id })
    if (!cart) res.json({ messege: "this user doesnt have cart", })
    let item = cart.cartItems.find(ele => ele.product == req.params.id)



    if (!item) return next(new AppError('product not found', (401)))

    item.quantity = req.body.quantity

    totalcartprice(cart)

    await cart.save()


    res.json({ messege: "update cart success", cart })



})
// remove items from cart 
export const removeItemsCart = catchError(async (req, res, next) => {

    let removecart = await carts.findOneAndUpdate({ user: req.USER._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })


    totalcartprice(removecart)
    await removecart.save()

    if (removecart) {
        return res.json({ msgg: 'delete success', removecart })
    } else {
        return next(new AppError('cart not found', (500)))
    }

})
// get cart of logged user
export const getUserCart = catchError(async (req, res, next) => {

    let getcart = await carts.findOne({ user: req.USER._id })





    if (getcart) {
        return res.json({ msgg: 'getsuccess', getcart })
    } else {
        return next(new AppError('user dont have cart ', (500)))
    }

})
// clear cart of logged user
export const clearUserCart = catchError(async (req, res, next) => {

    let clearcart = await carts.findOneAndDelete({ user: req.USER._id })





    if (clearcart) {
        return res.json({ msgg: 'clearsuccess', clearcart })
    } else {
        return next(new AppError('user dont have cart ', (500)))
    }

})

// apply coupon on cart


export const ApplyCoupon = catchError(async (req, res, next) => {
    //check on coupon
    let coupon = await coupons.findOne({ code: req.body.code, expires: { $gte: Date.now() } })
    if (!coupon) return next(new AppError('opps coupon not valid', (500)))
    let cart = await carts.findOne({ user: req.USER._id })
    if (!cart) return next(new AppError('user dont have cart', (500)))
    cart.discount = coupon.discount
    await cart.save()
    return res.json({ msgg: 'success', cart })
})