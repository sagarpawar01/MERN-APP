import express from 'express'
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from '../controllers/categoryController.js'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import multer from 'multer'
import cloudinary from "cloudinary"
import path from 'path'
import getDataUri from '../utils/getDataUri.js'
const router = express.Router()

// const storage = multer.diskStorage({
//     destination : (req,res,cb) => {
//         cb(null, "uploads/")
//     },
//     filename : (req,file,cb) => {
//         const extname = path.extname(file.originalname)
//         console.log(file)
//         cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${extname}`)
//     }
// })

const storage = multer.memoryStorage()

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

// router.post("/", (req,res) => {
//     uploadSingleImage(req,res,(err) => {
//         if(err){
//             res.status(400).send({message : err.message})
//         }else if(req.file){
//             const fileUri = getDataUri(req.file)
//             const myCloud = cloudinary.v2.uploader(fileUri.content)
//             res.status(200).send({message : "Image uploaded successfully", image : myCloud.secure_url})
//         }else{
//             res.status(400).send({message : "No Image file provided"})
//         }
//     })
// })

router.post('/', upload.single('image'), async (req, res) => {
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const myCloud = await cloudinary.uploader.upload(fileUri.content); // Use cloudinary.uploader.upload to upload image
        res.status(200).send({ message: 'Image uploaded successfully', image: myCloud.secure_url });
      } catch (err) {
        res.status(500).send({ message: 'Error uploading image to Cloudinary' });
      }
    } else {
      res.status(400).send({ message: 'No image file provided' });
    }
  });
  

export default router