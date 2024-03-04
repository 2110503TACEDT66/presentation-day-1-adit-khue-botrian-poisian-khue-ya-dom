
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
memberTier: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now
},
exp:{
    type:Date,
    default : Date.now + (365 * 24 * 60 * 60 * 1000);
}
},{
    collection:"member"
}
);
module.exports = mongoose.model('Reservation', ReservationSchema);