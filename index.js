const { connectDB } = require('./db');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const gameRoutes = require("./gameroutes");
const Game = require("./Schema");

const app = express();
const PORT = 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/game", gameRoutes);

// Create HTTP Server and attach WebSocket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST"],
  },
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinGame", (gameId) => {
    socket.join(gameId);
    console.log(`User joined game: ${gameId}`);
  });

  socket.on("makeMove", async ({ gameId, index, player }) => {
    try {
      const game = await Game.findOne({ gameId });

      if (!game || game.players[game.currentPlayer] !== player) {
        return;
      }

      // Validate move
      if (game.board[index]) {
        return;
      }

      // Update board
      game.board[index] = player === "Player 1" ? "X" : "O";

      // Check for winner or draw
      const winner = checkWinner(game.board);
      if (winner) {
        game.status = "finished";
        game.winner = winner;
      } else if (game.board.every((cell) => cell)) {
        game.status = "finished";
        game.winner = "Draw";
      } else {
        // Switch turn
        game.currentPlayer =
          game.currentPlayer === game.players[0]
            ? game.players[1]
            : game.players[0];
      }

      await game.save();

      // Broadcast updated game state
      io.to(gameId).emit("updateGame", game);
    } catch (error) {
      console.error("Error processing move:", error);
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
