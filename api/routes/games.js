const express = require('express');
const router = express.Router();
const { GetAllGames, GetGame, CreateGame, DeleteGame, UpdateGame } = require("../controllers/GameController");

router.get('/', GetAllGames);
router.get('/:id', GetGame);
router.post('/', CreateGame);
router.put('/:id', UpdateGame);
router.delete('/:id', DeleteGame);

module.exports = router;