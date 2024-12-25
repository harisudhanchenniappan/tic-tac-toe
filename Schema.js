const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameId: { type: String, unique: true },
  players: { type: Array, default: [] }, // Array of player IDs
  board: { type: Array, default: Array(9).fill(null) }, // 3x3 board
  currentPlayer: { type: String, default: null },
  winner: { type: String, default: null },
  status: { type: String, default: "waiting" } // "waiting", "ongoing", "finished"
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
