const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions.controller');

router.post('/create', transactionController.createTransaction);

module.exports = router;