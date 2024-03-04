
const mongoose = require('mongoose');
const MemberSchema=new mongoose.Schema({
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
createDate : {
    type: Date,
    default: Date.now()
},
expDate : {
    type:Date,
    default : Date.now() + (365 * 24 * 60 * 60 * 1000)
}
},{
    collection:"member"
}
);

MemberSchema.index({ user: 1, restaurant: 1 }, { unique: true });

module.exports = mongoose.model('Member', MemberSchema);