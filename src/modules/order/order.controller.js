

import { cart, carts } from "../../../database/models/cartModel.js";
import { coupons } from "../../../database/models/couponModel.js";
import { orders } from "../../../database/models/orderModel.js";
import { product, products } from "../../../database/models/productModel.js";
import { users } from "../../../database/models/userModel.js";
import { AppError } from "../../../utilities/appError.js";
import { catchError } from "../../middleware/catchError.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);
//create cash order

export const creatCashOrder = catchError(async (req, res, next) => {
    let cart = await carts.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', (401)))

    let totalOrderPrice = cart.totalCartPrice || cart.totalCartPriceAfterDiscount
    let order = await orders.create({ user: req.USER._id, orderItems: cart.cartItems, shippingAddresses: req.body.shippingAddresses, totalOrderPrice: totalOrderPrice })
    await order.save()
    res.json({ messege: "order added", order })
    // looping on products to increase sold and decrease stock
    let options = cart.cartItems.map((prod) => {
        return (
            {
                updateOne: {

                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
                }
            }

        )

    })
    await products.bulkWrite(options)
    //clear cart after order
    await carts.findByIdAndDelete(cart._id)
    res.json({ messege: "success" })
})

// get users orders

export const getUserOrders = catchError(async (req, res, next) => {

    let getOrder = await orders.findOne({ user: req.USER._id }).populate('orderItems.product')

    res.json({ messege: "success", getOrder })



})
// get all orders

export const getAllrOrders = catchError(async (req, res, next) => {

    let getOrders = await orders.find().populate('orderItems.product')

    res.json({ messege: "success", getOrders })



})
// Check out session

export const CreateCheckOutSession = catchError(async (req, res, next) => {

    let cart = await carts.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', (401)))

    let totalOrderPrice = cart.totalCartPrice || cart.totalCartPriceAfterDiscount




    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.USER.name


                    }

                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `https://www.google.com/search?sca_esv=d674af110d3d1eb5&sca_upv=1&rlz=1C1YTUH_enEG1084EG1084&sxsrf=ADLYWIKB2gtm_f06eCrSiDejiIuQ0NkSsg:1723512993792&q=payment&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J5MIFhvnvU242yFxzEEp3BeeRDeomFf8DkO7myIzvXpiBdfFz5h2ZV6WyoEoFhsRKWC0YT2o6yqVxHd61A8_1N098RlRDpMO5EZzCP0tBSyHH9FLkWPP8nkOK4XpicPt6rQZqfVIamI-H-qcjl9VxJ3X7AvL&sa=X&ved=2ahUKEwif4oqe6vCHAxXnTkEAHeLiKlcQtKgLegQIEhAB&biw=1024&bih=479&dpr=3.75#vhid=XJ5LofZ8TeytrM&vssid=mosaic`,
        cancel_url: 'https://www.google.com/search?sca_esv=d674af110d3d1eb5&sca_upv=1&rlz=1C1YTUH_enEG1084EG1084&sxsrf=ADLYWIKB2gtm_f06eCrSiDejiIuQ0NkSsg:1723512993792&q=payment&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J5MIFhvnvU242yFxzEEp3BeeRDeomFf8DkO7myIzvXpiBdfFz5h2ZV6WyoEoFhsRKWC0YT2o6yqVxHd61A8_1N098RlRDpMO5EZzCP0tBSyHH9FLkWPP8nkOK4XpicPt6rQZqfVIamI-H-qcjl9VxJ3X7AvL&sa=X&ved=2ahUKEwif4oqe6vCHAxXnTkEAHeLiKlcQtKgLegQIEhAB&biw=1024&bih=479&dpr=3.75#vhid=XJ5LofZ8TeytrM&vssid=mosaic',
        customer_email:req.USER.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddresses
    });

    res.json({ messege: "success", session })



})


    // create card order


export const CreateCardorder= catchError(async (req, res) => {

    const sig = req.headers['stripe-signature'].toString();

    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_r5tFhI6nn6kxOVcxNmSP5Ub2WGzxg5Jm");
    let checkout
    if (event.type == 'checkout.session.completed') {

        checkout = event.data.object;
    }

    // create  order

    let user = await users.findOne({ email: checkout.customer_email })
    let cart = await carts.findById(checkout.client_reference_id)
    if (!cart) return next(new AppError('cart not found', (401)))
    let order = await orders.create({ user: user._id, orderItems: cart.cartItems, shippingAddresses: checkout.metadata, totalOrderPrice: checkout.amount_total / 100, paymentType: 'card', isPaid: true })

    await order.save()
    res.json({ messege: "order added", order })
    // looping on products to increase sold and decrease stock
    let options = cart.cartItems.map((prod) => {
        return (
            {
                updateOne: {

                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
                }
            }

        )

    })
    await products.bulkWrite(options)
    //clear cart after order
    await carts.findByIdAndDelete(cart._id)





    res.json({ messege: "success", checkout });
})