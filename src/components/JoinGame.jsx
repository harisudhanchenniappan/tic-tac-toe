import React, { useState } from "react";
import axios from "./Api";
import { useNavigate } from "react-router-dom";

const JoinGame = () => {
  const [gameId, setGameId] = useState("");
  const navigate = useNavigate();

  const handleJoinGame = async () => {
    try {
      await axios.post("/game/join", { gameId, player: "Player 2" });
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error("Error joining game:", error);
      alert("Game not found or full.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
};

export default JoinGame;
