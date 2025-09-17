const Transaction = require('../../../Models/transactionSchema'); // Adjust path as needed

// Create rental transaction
const createRentalController = async (req, res) => {
  try {
    const { userId, propertyId, price, rentalDurationMonths, status } = req.body;
    const newRental = new Transaction({
      userId,
      propertyId,
      transactionType: 'rental',
      price,
      rentalDurationMonths,
      status: status || 'completed',
      transactionDate: new Date()
    });
    await newRental.save();
    res.status(201).json({ success: true, rental: newRental });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create sale transaction
const createSaleController = async (req, res) => {
  try {
    const { userId, propertyId, price, status } = req.body;
    const newSale = new Transaction({
      userId,
      propertyId,
      transactionType: 'sale',
      price,
      status: status || 'completed',
      transactionDate: new Date()
    });
    await newSale.save();
    res.status(201).json({ success: true, sale: newSale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create purchase transaction
const createPurchaseController = async (req, res) => {
  try {
    const { userId, propertyId, price, status } = req.body;
    const newPurchase = new Transaction({
      userId,
      propertyId,
      transactionType: 'purchase',
      price,
      status: status || 'completed',
      transactionDate: new Date()
    });
    await newPurchase.save();
    res.status(201).json({ success: true, purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get rentals by user uid
const getUserRentalsController = async (req, res) => {
  try {
    const { uid } = req.params;
    const rentals = await Transaction.find({ userId: uid, transactionType: 'rental' }).populate('propertyId');
    res.status(200).json({ success: true, rentals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get sales by user uid
const getUserSalesController = async (req, res) => {
  try {
    const { uid } = req.params;
    const sales = await Transaction.find({ userId: uid, transactionType: 'sale' }).populate('propertyId');
    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get purchases by user uid
const getUserPurchasesController = async (req, res) => {
  try {
    const { uid } = req.params;
    const purchases = await Transaction.find({ userId: uid, transactionType: 'purchase' }).populate('propertyId');
    res.status(200).json({ success: true, purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRentalController,
  createSaleController,
  createPurchaseController,
  getUserRentalsController,
  getUserSalesController,
  getUserPurchasesController,
};
