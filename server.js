const express = require("express");
const dotenv = require("dotenv");
//Load env vars
const connectDB = require('./config/db') ;

//Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB() ;

const app = express();

app.use(express.json());

const restaurants = require('./routes/restaurants');
app.use('/api/v1/restaurants', restaurants);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Server running in`, process.env.NODE_ENV, ` mode on port `, PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`) ;
    // close server & exit process
    server.close(() => process.exit(1)) ;
})