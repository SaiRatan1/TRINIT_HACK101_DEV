const express = require('express')
const path = require('path')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const DB = 'mongodb+srv://SaiRatan:SaiRatan@cluster0.39xb8ki.mongodb.net/testDB?retryWrites=true&w=majority'

mongoose.connect(DB).then(()=>{console.log('Connection successfull')}).catch((err)=>{console.log(`Couldn't connect to database`)})




module.exports = router;