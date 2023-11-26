const express = require("express");
// const createUser = require("../model/user.model");
const gameController = require('../controllers/game.controller')
const router = express.Router();
router.post('/creategame',gameController.createGame);
router.get('/getgameDdata',gameController.getGameData)
router.put('/updategame/:userId', gameController.updateGameData)
router.delete('/deletegame/:userId',gameController.deleteGameData)
module.exports = router;