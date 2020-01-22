const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('../configs/validation');

let UserSchema = new Schema({
    mappingId: { type: String, required: true },
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    userNumber: { type: String }, // 234fewnfj4 readable code for helping support team
    email: { type: String },
    mobileNumber: { type: String, unique: true },
    gender: { type: String },
    country: { type: String, required: true },
    merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
});
module.exports = mongoose.model('User', UserSchema);