import axios from "axios";
import authHeader from "./auth-header";

const API_BASE = process.env.NODE_ENV === 'development'
  ? `http://localhost:8000/api/v1`
  : import.meta.env.VITE_API_BASE;
const API_URL = "games"

const getAllPrivateGames = () => {
  return axios.get(`${API_BASE}/${API_URL}`, { headers: authHeader() })
}

const getPrivateGame = (id: string) => {
  return axios.get(`${API_BASE}/${API_URL}/${id}`, { headers: authHeader() })
}

const createPrivateGame = (game: Game) => {
  return axios.post(`${API_BASE}/${API_URL}`, game, { headers: authHeader() })
}

const updatePrivateGame = (id: string, game: Game) => {
  return axios.put(`${API_BASE}/${API_URL}/${id}`, game, { headers: authHeader() })
}

const deletePrivateGame = (id: string) => {
  return axios.delete(`${API_BASE}/${API_URL}/${id}`, { headers: authHeader() })
}

const gamesService = {
  getAllPrivateGames,
  getPrivateGame,
  createPrivateGame,
  updatePrivateGame,
  deletePrivateGame
}

export default gamesService;