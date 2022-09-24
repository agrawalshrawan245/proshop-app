import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


export const addOrderItems = asyncHandler(async(req, res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    
    if(orderItems && orderItems.length === 0){
        res.status(404)
        throw new Error('No order items')
    }else{
        const order = new Order({
            orderItems,
            shippingAddress,
            user: req.user._id,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        
        const newOrder = await order.save()
        res.status(201).json(newOrder)
    }
})



export const updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            updated_time:req.body.updated_time,
            email_address:req.body.payer.email_address,
        }
        const updatedOrder = await order.save()
        res.status(201).json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!!')
    }
})



export const getOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')


    if(order){
        res.status(201).json(order)
    }else{
        res.status(404)
        throw new Error('Order not found!!')
    }
})



export const listMyOrders = asyncHandler(async(req, res)=>{
    const order = await Order.find({user:req.user._id})
    res.status(201).json(order)
})



export const adminListMyOrders = asyncHandler(async(req, res)=>{
    const order = await Order.find({}).populate('user', 'name email')
    res.status(201).json(order)
})


export const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)

    //errchk
    if(order && order.isPaid){
    // if(order){
        order.isDelivered = true,
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.status(201).json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!!')
    }
})

