const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer');
const fs = require('fs')
const cors = require('cors')
const sendEmail = require('./controllers/sendEmail')

dotenv.config()

//DB Connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('DB Connected'))
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//Routes:
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')


//middleware:
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors());
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);



const port = process.env.PORT || 8000
app.listen(port, () => { console.log(`Node listening on port: ${port}`) })
