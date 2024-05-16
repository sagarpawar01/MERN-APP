import express from 'express'
import { addProduct, removeProduct, updateProductDetails, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from '../controllers/productController.js'
import formidable from "express-formidable"
const router = express.Router()
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";

router.route('/top').get(fetchTopProducts)
router.route('/new').get(fetchNewProducts)
router.route('/allProducts').get(fetchAllProducts)
router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct).get(fetchProducts)
router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProductDetails).delete(authenticate,authorizeAdmin,removeProduct).get(fetchProductById)
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.route('/filtered-products').post(filterProducts)



// router.post('/auth', loginUser)
// router.post('/logout', logoutCurrentUser)

// router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)
// router.route('/:id').delete(authenticate, authorizeAdmin,deleteUserById).get(authenticate,authorizeAdmin,getUserById).put(authenticate,authorizeAdmin,updateUserById)

export default router