const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    creationDate: { type: Date, required: true },
    from_userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to_userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true }, // approved , declined, settled , refunded
    sourceType: { type: String, required: true }, // Deal , Bid , Init
    sourceId: { type: mongoose.Schema.Types.ObjectId }, // Dealid , bidId *optional
    sourceData: { type: mongoose.Schema.Types.Mixed }, // [All data in transaction]
    comment: { type: String },
    paymentMethod: { type: String, required: true }, //card
    code: { type: String, required: true }, // transaction code come from our backend request
    isArchived: { type: Boolean, required: true, default: false }
});


// Export the model
module.exports = mongoose.model('Transaction', TransactionSchema);