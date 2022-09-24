import express from "express";
import { addOrderItems, getOrderById,  updateOrderToPaid, listMyOrders, adminListMyOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import {adminProtect, protect} from '../middleware/protectMiddleware.js'

const router = express.Router()

// @access Private
router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, listMyOrders)
router.route('/allorders').get(protect, adminProtect, adminListMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, adminProtect, updateOrderToDelivered)


export default router
