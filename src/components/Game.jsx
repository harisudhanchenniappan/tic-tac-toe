import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./Socket"; // Ensure this is your WebSocket instance
import Board from "./Board";
import axios from "./Api";

const Game = () => {
  const { gameId } = useParams(); // Retrieve gameId from URL params
  const [board, setBoard] = useState(Array(9).fill(null)); // Initial empty board
  const [currentPlayer, setCurrentPlayer] = useState(null); // Tracks the current player
  const [players, setPlayers] = useState([]); // List of players in the game
  const [winner, setWinner] = useState(null); // Winner of the game (null, "X", "O", or "Draw")
  const [status, setStatus] = useState(""); // Current game status (e.g., "waiting", "in-progress", "finished")

  // Fetch game data when the component mounts
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/game/${gameId}`); // Fetch game data from backend
        const game = response.data;

        // Update local state with fetched game data
        setBoard(game.board);
        setCurrentPlayer(game.currentPlayer);
        setPlayers(game.players);
        setStatus(game.status);
        setWinner(game.winner);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();

    // Join the game room via WebSocket
    socket.emit("joinGame", gameId);

    // Listen for game updates from the backend
    socket.on("updateGame", (updatedGame) => {
      console.log("Game updated:", updatedGame);

      // Update local state with the latest game data
      setBoard(updatedGame.board);
      setCurrentPlayer(updatedGame.currentPlayer);
      setPlayers(updatedGame.players);
      setStatus(updatedGame.status);
      setWinner(updatedGame.winner);
    });

    // Cleanup WebSocket listener when the component unmounts
    return () => {
      socket.off("updateGame");
    };
  }, [gameId]);

  // Handle player moves
  const handleMove = (index) => {
    if (board[index] || winner || status !== "in-progress") {
      // Ignore invalid moves: cell is filled, game is over, or not in progress
      return;
    }

    // Emit the move to the backend via WebSocket
    socket.emit("makeMove", { gameId, index, player: currentPlayer });
  };

  return (
    <div style={styles.container}>
      <h1>Tic Tac Toe</h1>
      <h2>Status: {status}</h2>
      <h3>Players: {players.length > 0 ? players.join(" vs ") : "Waiting for opponent..."}</h3>
      {winner ? (
        <h2>{winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}</h2>
      ) : (
        <h2>{status === "in-progress" && `Current Player: ${currentPlayer}`}</h2>
      )}
      <Board board={board} onClick={handleMove} />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Game;
