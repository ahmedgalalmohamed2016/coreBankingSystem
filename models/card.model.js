const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardSchema = new Schema({
    creationDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cardNumber: { type: String, required: true }, // 3454*******7654
    encCardnumber: { type: JSON, required: true }, // encrypted card
    expireMonth: { type: String, required: true }, //03
    expireYear: { type: String, required: true }, // 2020
    holderName: { type: String, required: true }, // Mohamed Ahmed
    isDeleted: { type: Boolean, default: false, required: true }
});

// Export the model
module.exports = mongoose.model('Card', CardSchema);