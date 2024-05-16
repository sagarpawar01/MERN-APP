import asyncHandler from "../middlewares/asyncHndler.js"
import Product from "../models/productModel.js"

const addProduct = asyncHandler(async (req,res) => {

    try {
        const { name, description, price, category, quantity, brand } = req.fields
        console.log(name, description, price, category, quantity, brand)

        switch (true) {
            case !name:
                return res.json({error : "Name is required"})
            case !brand:
                return res.json({error : "Brand is required"})
            case !description:
                return res.json({error : "Description is required"})
            case !price:
                return res.json({error : "Price is required"})
            case !category:
                return res.json({error : "Category is required"})
            case !quantity:
                return res.json({error : "Quantity is required"})
        }

        const product = new Product({...req.fields})
        await product.save()
        // if(!name){
        //     return res.json({error : "Name is required"})
        // }

        // const existingCategory = await Category.findOne({name})

        // if(existingCategory){
        //     return res.json({error : "Category already exists"})
        // }

        // const category = await new Category({name}).save()
        res.json(product)

    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const updateProductDetails = asyncHandler(async (req,res) => {

    try {
        const { name, description, price, category, quantity, brand } = req.fields

        switch (true) {
            case !name:
                return res.json({error : "Name is required"})
            case !brand:
                return res.json({error : "Brand is required"})
            case !description:
                return res.json({error : "Description is required"})
            case !price:
                return res.json({error : "Price is required"})
            case !category:
                return res.json({error : "Category is required"})
            case !quantity:
                return res.json({error : "Quantity is required"})
        }
        console.log(req.fields,name,req.params.id)
        const product = await Product.findOneAndUpdate({_id : req.params.id},{...req.fields},{new : true})
        // await product.save()
        res.json(product)
        // if(!name){
        //     return res.json({error : "Name is required"})
        // }

        // const existingCategory = await Category.findOne({name})

        // if(existingCategory){
        //     return res.json({error : "Category already exists"})
        // }

        // const category = await new Category({name}).save()
    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const removeProduct = asyncHandler(async (req,res) => {

    try {

        const product = await Product.findOneAndDelete({_id : req.params.id})
        res.json(product)
        // if(!name){
        //     return res.json({error : "Name is required"})
        // }

        // const existingCategory = await Category.findOne({name})

        // if(existingCategory){
        //     return res.json({error : "Category already exists"})
        // }

        // const category = await new Category({name}).save()
    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const fetchProductById = asyncHandler(async (req,res) => {
    try {
        const product = await Product.findOne({_id : req.params.id})
        console.log(product,"product")
        if(product){
            return res.json(product)
        }
        else{
            res.status(404)
        throw new Error("Product not found")
        }
    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const fetchProducts = asyncHandler(async (req,res) => {
    try {
        const pageSize = 6
        const keyword = req.query.keyword ? {name : {$regex : req.query.keyword, $options : "i"}} : {}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)
        res.json({
            products,
            page : 1,
            pages : Math.ceil(count/pageSize),
            hasMore : false
        })

    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const fetchAllProducts = asyncHandler(async (req,res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({createdAt : -1})
        res.json({
            products
        })

    } catch (error) {
        res.status(500).json({error : "Server Error"});
    }

    // console.log(username, email, password,"username")
})

const addProductReview = asyncHandler(async (req,res) => {
    try {
        const { rating, comment } = req.body
        const product = await Product.findOne({_id : req.params.id})
        console.log(product.reviews.reduce((acc, item) => item.rating + acc, 0))
        if(product){
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
            if(alreadyReviewed){
                res.status(400)
                throw new Error("Product already reviewed")
            }

            const review = {
                name : req.user.username,
                rating : Number(rating),
                comment,
                user : req.user._id
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length

            product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
            await product.save()

            res.status(201).json({message : "Review Added"})
        }
        else{
            res.status(404)
            throw new Error("Product not found")
        }

    } catch (error) {
        res.status(500).json(error.message);
    }

    // console.log(username, email, password,"username")
})

const fetchTopProducts = asyncHandler(async (req,res) => {
    try {
        const products = await Product.find({}).sort({ratings : -1}).limit(4)
        res.json(products)
    } catch (error) {
        res.status(500).json({error : "Server Error"});
    }

    // console.log(username, email, password,"username")
})

const fetchNewProducts = asyncHandler(async (req,res) => {
    try {
        const products = await Product.find({}).sort({_id : -1}).limit(5)
        res.json(products)

    } catch (error) {
        res.status(500).json({error : "Server Error"});
    }

    // console.log(username, email, password,"username")
})


const filterProducts = asyncHandler(async(req,res) => {
    try {
        const { checked, radio } = req.body
        let args ={}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte : radio[0], $lte : radio[1]}
        console.log(args,"products")
        const products = await Product.find(args)
        res.json(products)
    } catch (error) {
        res.status(500).json({error : "Server Error"})
    }
})

export { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts }