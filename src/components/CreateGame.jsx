import React, { useState } from "react";
import axios from "./Api";

const CreateGame = () => {
  const [gameId, setGameId] = useState(null);

  const handleCreateGame = async () => {
    try {
      const response = await axios.post("/game/create", { player: "Player 1" });
      setGameId(response.data.gameId);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateGame}>Create Game</button>
      {gameId && (
        <p>
          Share this link:{" "}
          <a href={`https://tic-tac-toe-1611.netlify.app/game/${gameId}`}>
          https://tic-tac-toe-1611.netlify.app/game/{gameId}
          </a>
        </p>
      )}
    </div>
  );
};

export default CreateGame;
