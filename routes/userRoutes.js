const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();


// POST LOGIN
router.post('/login', userController.postLogin);

// POST REGISTER
router.post('/register', userController.postRegister)
router.post("/display", userController.dashboard);





module.exports = router;