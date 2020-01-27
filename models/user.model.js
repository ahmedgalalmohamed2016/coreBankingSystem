const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userToken: { type: String},
    deviceToken:{ type: String},
    userName:{ type: String, required: true},
    password:{ type: String},
    isActive:{ type: String, required: true },
    isVerified:{ type: String, required: true },
    mappingId: { type: String, required: true },
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    userNumber: { type: String },
    email: { type: String },
    mobileNumber: { type: String, unique: true },
    gender: { type: String },
    country: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
});
module.exports = mongoose.model('User', UserSchema);