const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('../configs/validation');

let UserSchema = new Schema({
    userNumber: { type: String, unique: true, required: [true, 'user number is required'] },
    role: { type: String, required: true },
    firstName: { type: String, },
    lastName: { type: String, },
    address: { type: String },
    email: { type: String },
    mobileNumber: { type: String, unique: true },
    gender: { type: String },
    country: { type: String, required: true },
    merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
});
module.exports = mongoose.model('User', UserSchema);