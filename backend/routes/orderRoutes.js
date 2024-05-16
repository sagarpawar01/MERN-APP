import express from 'express'
const router = express.Router()

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrdersAsPaid, markOrderAsDelivered } from '../controllers/orderController.js';

router.route("/").post(authenticate, createOrder).get(authenticate, getAllOrders)
router.route("/mine").get(authenticate, getUserOrders)
router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(calculateTotalSales)
router.route("/total-sales-by-date").get(calculateTotalSalesByDate)
router.route("/:id").get(authenticate, findOrderById)
router.route("/:id/pay").put(authenticate, markOrdersAsPaid)
router.route("/:id/deliver").put(authenticate, authorizeAdmin, markOrderAsDelivered)

export default router