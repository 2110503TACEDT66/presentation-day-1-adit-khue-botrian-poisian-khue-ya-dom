const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type :String,
        required: [true,'Please add a name'],
        unique:true,
        trim:true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    open_time:{
        type: String,
        required: [true,'Please add an open time']
    },
    close_time:{
        type: String,
        required: [true,'Please add an close time']
    },
    address:{
        type : String,
        required: [true,'Please add an address']
    },
    
    tel: {
        type: String
    }
    
    // ,district:{
    //     type: String,
    //     required: [true,'Please add a district']
    // },
    // province: {
    //     type: String,
    //     required: [true,'Please add a province']
    // },
    // postalcode:{
    //     type: String,
    //     required: [true,'Please add a postalcode'],
    //     maxlength:[5,'Postal Code can not be more than 5 digits']
    // },   
    // region:{
    //     type : String,
    //     required: [true,'Please add a region']
    // }
},{
    collection : "restaurant"
});

module.exports=mongoose.model('Restaurant',RestaurantSchema);
