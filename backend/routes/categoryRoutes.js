import express from 'express'
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from '../controllers/categoryController.js'
const router = express.Router()
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"

router.route("/categories").get(listCategory)
router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory).delete(authenticate, authorizeAdmin, removeCategory).get(readCategory)


export default router