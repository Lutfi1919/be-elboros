const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions.controller');

router.post('/create', transactionController.createTransaction);
router.delete('/delete/:id', transactionController.deleteTransaction);
router.put('/update/:id', transactionController.updateTransaction);

module.exports = router;