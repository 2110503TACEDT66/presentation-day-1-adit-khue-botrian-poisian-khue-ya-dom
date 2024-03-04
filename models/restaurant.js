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
},{
    collection : "restaurant"
},{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

//Cascade delete reservation when a restaurant is deleted
RestaurantSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log(`Reservation being removed from Restaurant ${this._id}`);
    await this.model('Reservation').deleteMany({restaurant: this._id});
    next();
});

RestaurantSchema.virtual('reservations',{
    ref:"Reservation",
    localField:'_id',
    foreignField:'restaurant',
    justOne:false
});

module.exports=mongoose.model('Restaurant',RestaurantSchema);
