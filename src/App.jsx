import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Game from "./components/Game";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CreateGame />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/game/:gameId" element={<Game />} />
    </Routes>
  </Router>
);

export default App;
