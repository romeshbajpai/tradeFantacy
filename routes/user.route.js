const express = require("express");
// const createUser = require("../model/user.model");
const UserController = require('../controllers/user.controller')
const router = express.Router();
router.get('/getuserByIDD',UserController.getUserByUsername)
router.post('/register', UserController.registerUser)
router.post('/login',UserController.loginUser)
module.exports = router;
