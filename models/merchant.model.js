const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MerchantSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mappingId: { type: String, required: true }, // id mapping with bank
    categories: { type: mongoose.Schema.Types.Mixed }, // [array of categories]
    country: { type: String, required: true }, // Jordan
    city: { type: String, required: true },
    legalName: { type: String, required: true },
    commonName: { type: String, required: true },
    isActive: { type: Boolean, default: false, required: true },
    contactPerson: { type: String },
    email: { type: String },
    mainPhoneNumber: { type: String },
    homapageDesc: { type: String },
    bio: { type: String },
    address: { type: String },
    merchantId: { type: mongoose.Schema.Types.ObjectId },
    currency: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('Merchant', MerchantSchema);