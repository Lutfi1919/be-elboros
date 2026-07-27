const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');
const signUpController = require('../controllers/signup.controller');

router.post('/login', loginController.login);
router.post('/signup', signUpController.signup);

module.exports = router;