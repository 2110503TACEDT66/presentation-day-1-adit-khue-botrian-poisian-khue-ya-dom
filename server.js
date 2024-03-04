const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require('cookie-parser');
//Load env vars
const connectDB = require('./config/db') ;

//Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB() ;

const app = express();

app.use(express.json());
app.use(cookieparser());
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