const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// user
router.get('/user', userController.getAll);
router.post('/login', userController.login);