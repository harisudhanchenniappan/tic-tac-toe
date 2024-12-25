const express = require("express");
const Game = require("./Schema");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Create a new game
router.post("/create", async (req, res) => {
  const gameId = uuidv4();
  const newGame = new Game({ gameId, players: [req.body.player] });
  await newGame.save();
  res.json({ gameId });
});

// Join a game
router.post("/join", async (req, res) => {
  const { gameId, player } = req.body;
  const game = await Game.findOne({ gameId });
  if (game && game.players.length < 2) {
    game.players.push(player);
    game.status = "ongoing";
    game.currentPlayer = game.players[0]; // First player's turn
    await game.save();
    res.json({ message: "Joined game successfully" });
  } else {
    res.status(400).json({ message: "Game not available" });
  }
});

module.exports = router;
