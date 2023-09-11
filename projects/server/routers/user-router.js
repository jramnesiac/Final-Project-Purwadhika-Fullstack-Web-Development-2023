const express = require('express');
const userController = require('../controllers/user/user-controllers');
const { checkregister } = require('../midlewares/user/user-midleware');
const { verifyToken } = require('../midlewares/token');
const { checkForgotPassword, checkResetPassword, checkNewPassword } = require('../midlewares/userValidator');

const router = require('express').Router();

router.post('/login', userController.login)
router.post('/register', checkregister,userController.register);
router.post('/keepLogin',verifyToken , userController.keepLogin)
router.patch('/resetPassword',verifyToken, checkResetPassword , userController.resetPassword)
router.post('/sendMail', checkForgotPassword,userController.forgotPassword)
router.post('/checkOtp', userController.checkOtp)
router.patch('/changePassword', verifyToken,checkNewPassword, userController.changePassword)

module.exports = router;