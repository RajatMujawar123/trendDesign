const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const {textureTshirtModel} = require('./model/texture.')


const connection = mongoose.connect(process.env.MONGODB_URI)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Only PNG files are allowed'), false)
    }
  }
})

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("Home Page")
})

app.use('/uploads', express.static('uploads'))


app.post("/addtexturetshirt", upload.single('image'), async(req,res)=>{
    try {
        const { itemName, category, price } = req.body
        const imagePath = req.file.path

        const newData = new textureTshirtModel({
            itemName,
            image: imagePath, 
            category,
            price: parseFloat(price)
        })
        
        await newData.save()
        res.send({"msg":"Data Added"})
    } catch (error) {
        res.send({"msg": error.message})
    }
})


app.get("/getTshirtsCategoryWise/:category", async(req,res)=>{
    try {
        const { category } = req.params
        const data = await textureTshirtModel.find({ category })
        res.send(data)
    } catch (error) {
        res.send({"msg": error.message})
    }
})

app.listen(process.env.PORT, async()=>{
    try {
        await connection
         console.log("Connected to DB")
         console.log("Running at 8080")
    } catch (error) {
        console.log({"MSG": error})
    }
   
})