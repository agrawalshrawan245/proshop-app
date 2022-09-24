import express from "express";
import { createReview, getProductById, getProducts, adminDeleteProduct, adminUpdateProduct, adminCreateProduct } from '../controllers/productController.js'
import {protect, adminProtect } from '../middleware/protectMiddleware.js'

const router = express.Router()

// @access Private
router.get('/', getProducts)
        
router.route('/createproduct').post(protect, adminProtect, adminCreateProduct)
                                

// @access Private
router.route('/:id').get(getProductById)
                    .delete(protect, adminProtect, adminDeleteProduct)
                    .put(protect, adminProtect, adminUpdateProduct)

router.route('/:id/review').post(protect, createReview)


export default router

