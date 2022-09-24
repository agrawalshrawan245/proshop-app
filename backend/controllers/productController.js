import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import path from 'path'

export const getProducts = asyncHandler(async(req, res)=>{
    const searchparam = req.query.keyword ? {
        name : {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    const products = await Product.find({...searchparam})
    
    res.json(products)
})


export const getProductById = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


export const adminDeleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.delete()
        // res.send()
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


export const adminUpdateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = req.body.name || product.name
        product.brand = req.body.brand || product.brand
        product.price = req.body.price || product.price
        product.category = req.body.category || product.category
        product.description = req.body.description || product.description
        
        const updatedProduct = await product.save()
        // console.log(updatedProduct)

        res.json({
            "name" : updatedProduct.name,
            "brand" : updatedProduct.brand,
            "price" : updatedProduct.price,
            "category" : updatedProduct.category,
            "description" : updatedProduct.description
        })
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export const adminCreateProduct = asyncHandler(async(req, res) => {
    const { name, brand, image, price, category, description } = req.body
    // console.log(name)
    
    const product = new Product({
        name:name,
        brand:brand,
        user:req.user._id,
        image:image,
        price: price,
        category:category,
        description:description,
    })

    const newProduct = await product.save()
    if(newProduct){
        res.status(201).json(newProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export const createReview = asyncHandler(async(req, res) => {
    const {rating, comment} = req.body
    
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed = product.reviews ? await product.reviews.find(r => r.user.toString() === req.user._id.toString()) : {}
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed.')
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user:req.user._id,
        }
        
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        
        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
        
        const newProd = await product.save()


        res.status(201).json({success:'success'})

    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})




