const dotenv = require('dotenv')
const path = require('path');
const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config()
app.use(cookieParser());

mongoose.set('strictQuery', true)
const DB = process.env.DB_CONNECTION_LINK
mongoose.connect(DB).then(() => { console.log('Connection successfull') }).catch((err) => { console.log(`Couldn't connect to database`) })

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname,"static")))
app.use('/', require(path.join(__dirname, 'routes/ngoroutes.js')))

app.use('/api/ngo', require('./routes/ngoroutes'))
app.use('/api/auth', require('./routes/userroutes'))
app.use('/api/group', require('./routes/groupRoutes'))
app.use('/api/chat', require('./routes/chatRoutes'))
app.use('/api/search', require('./routes/searchRoutes'))
app.use('/api/campaign', require('./routes/campaignRoutes'))

app.listen(4000, () => {
    console.log('Server started on port 4000')
})

// TO-DO : Cookie Parser