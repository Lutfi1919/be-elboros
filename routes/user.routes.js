const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');
const signUpController = require('../controllers/signup.controller');
const userController = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/auth')

router.post('/login', loginController.login);
router.post('/signup', signUpController.signup);
router.put('/saldo', checkToken, userController.updateSaldo);

module.exports = router;