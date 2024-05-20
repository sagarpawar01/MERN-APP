import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'
import cloudinary from "cloudinary"
import {connectDB} from './config/db.js'
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()
const port = process.env.PORT || 5000

connectDB()

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLIENT_NAME,
    api_key : process.env.CLOUDINARY_CLIENT_API_KEY,
    api_secret : process.env.CLOUDINARY_CLIENT_API_SECRET
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/config/paypal", (re,res) => {
    res.send({clientId : process.env.PAYPAL_CLIENT_ID})
})

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

app.listen(port, () => console.log(`server is running on port: ${process.env.DATABASE_URI}`))
