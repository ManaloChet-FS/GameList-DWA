const passport = require("passport");
const passportService = require("../services/passport");
const protectedRoute = passport.authenticate('jwt', { session: false });

const express = require('express');
const router = express.Router();
const { GetAllGames, GetGame, CreateGame, DeleteGame, UpdateGame } = require("../controllers/GameController");

router.get('/', protectedRoute, GetAllGames);
router.get('/:id', protectedRoute, GetGame);
router.post('/', protectedRoute, CreateGame);
router.put('/:id', protectedRoute, UpdateGame);
router.delete('/:id', protectedRoute, DeleteGame);

module.exports = router;