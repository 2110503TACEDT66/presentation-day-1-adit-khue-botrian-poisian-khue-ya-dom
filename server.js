const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require('cookie-parser');
const helmet = require('helmet');
const {xss}=require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');
const hpp=require('hpp');
const cors = require('cors');
//Load env vars
const connectDB = require('./config/db') ;
const mongoSanitize = require('express-mongo-sanitize');
//Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB() ;

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter=rateLimit({
    windowsMs:10*60*1000,//10 mins
    max: 100
});
app.use(limiter);
app.use(hpp());
app.use(cors());

const restaurants = require('./routes/restaurants');
const reservations = require('./routes/reservations');
const member = require('./routes/member');
const auth = require('./routes/auth');
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/reservations', reservations);
app.use('/api/v1/auth', auth);
app.use('/api/v1/member', member);


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Server running in`, process.env.NODE_ENV, ` mode on port `, PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`) ;
    // close server & exit process
    server.close(() => process.exit(1)) ;
})