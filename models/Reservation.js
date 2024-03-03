
const mongoose = require('mongoose');
const ReservationSchema=new mongoose.Schema({
user: {
    type:mongoose.Schema.ObjectId,
ref: 'User',
required: true
},
restaurant:{
type: mongoose.Schema.ObjectId,
ref: 'Restaurant',
required: true
},
reserDate: {
    type: Date,
    required: true
},
amount:{
    type:Number,
    required:true
},
createdAt: {
type: Date,
default: Date.now
}
},{
    collection:"reservations"
}
);
module.exports =mongoose.model('Reservation', ReservationSchema);