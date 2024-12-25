import axios from "axios";

const api = axios.create({
  baseURL: "https://tic-tac-toe-1-e0lp.onrender.com", // Backend base URL
});

export default api;
