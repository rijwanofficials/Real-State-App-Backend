const express = require('express');
const {
  createRentalController,
  createSaleController,
  createPurchaseController,
  getUserRentalsController,
  getUserSalesController,
  getUserPurchasesController,
} = require('./controller');
const { validateTokenMiddleware } = require('../validateTokenMiddleware');


const transactionsRouter = express.Router();

// Create transaction routes
transactionsRouter.post('/rental', validateTokenMiddleware, createRentalController);
transactionsRouter.post('/sale', validateTokenMiddleware, createSaleController);
transactionsRouter.post('/purchase', validateTokenMiddleware, createPurchaseController);

// Get transaction routes
transactionsRouter.get('/rentals', validateTokenMiddleware, getUserRentalsController);
transactionsRouter.get('/sales', validateTokenMiddleware, getUserSalesController);
transactionsRouter.get('/purchases', validateTokenMiddleware, getUserPurchasesController);

module.exports = { transactionsRouter };
