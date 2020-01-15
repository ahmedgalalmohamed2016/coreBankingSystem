const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MerchantSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mappingId: { type: String, required: true },
    country: { type: String, required: true },
    legalName: { type: String, required: true },
    merchantId: { type: mongoose.Schema.Types.ObjectId },
    currency: { type: String, required: true },
    country: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('Merchant', MerchantSchema);