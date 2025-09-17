const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const transactionSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    propertyId: { type: ObjectId, ref: 'Property', required: true },
    transactionType: {
        type: String,
        enum: ['purchase', 'sale', 'rental'],
        required: true,
    },
    transactionDate: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    rentalDurationMonths: { type: Number }, // only for rentals
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'completed',
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
