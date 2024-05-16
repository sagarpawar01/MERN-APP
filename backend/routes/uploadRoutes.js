import express from 'express'
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from '../controllers/categoryController.js'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null, "uploads/")
    },
    filename : (req,file,cb) => {
        const extname = path.extname(file.originalname)
        console.log(file)
        cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype
    console.log(extname,"extname")

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Image only"), false)
    }
}

const upload = multer({storage, fileFilter})
const uploadSingleImage = upload.single('image')

router.post("/", (req,res) => {
    uploadSingleImage(req,res,(err) => {
        if(err){
            res.status(400).send({message : err.message})
        }else if(req.file){
            res.status(200).send({message : "Image uploaded successfully", image : `/${req.file.path}`})
        }else{
            res.status(400).send({message : "No Image file provided"})
        }
    })
})


export default router