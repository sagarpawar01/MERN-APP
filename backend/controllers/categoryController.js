import asyncHandler from "../middlewares/asyncHndler.js"
import Category from "../models/categoryModel.js"

const createCategory = asyncHandler(async (req,res) => {

    try {
        const { name } = req.body
        if(!name){
            return res.json({error : "Name is required"})
        }

        const existingCategory = await Category.findOne({name})

        if(existingCategory){
            return res.json({error : "Category already exists"})
        }

        const category = await new Category({name}).save()
        res.json(category)

    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const updateCategory = asyncHandler(async (req,res) => {

    try {
        const { name } = req.body
        const { categoryId } = req.params
        
        const category = await Category.findOne({_id : categoryId})

        if(!category){
            return res.status(404).json({error : "Category not found"})
        }

        category.name = name

        const updateCategory = await category.save()
        res.json(updateCategory)

    } catch (error) {
        res.status(500).json(error);
    }

    // console.log(username, email, password,"username")
})

const removeCategory = asyncHandler(async (req,res) => {

    try {
        const { categoryId } = req.params
        console.log(categoryId)
        
        const category = await Category.findOne({_id : categoryId})

        if(!category){
            return res.status(404).json({error : "Category not found"})
        }

        const removed = await Category.findOneAndDelete({_id : categoryId})
        res.json(removed)
    } catch (error) {
        res.status(500).json({error : "Internal server error"});
    }

    // console.log(username, email, password,"username")
})

const listCategory = asyncHandler(async (req,res) => {
    try {
        const allCategories = await Category.find({})
        res.json(allCategories)
    } catch (error) {
        res.status(400).json(error.message);
    }

    // console.log(username, email, password,"username")
})

const readCategory = asyncHandler(async (req,res) => {

    try {
        const { name } = req.body
        const { categoryId } = req.params
        
        const category = await Category.findOne({_id : categoryId})

        if(!category){
            return res.status(404).json({error : "Category not found"})
        }

        res.json(category)
    } catch (error) {
        res.status(400).json(error.message);
    }

    // console.log(username, email, password,"username")
})

export { createCategory, updateCategory, removeCategory, listCategory, readCategory }