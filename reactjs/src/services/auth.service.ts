import axios from "axios";

const API_BASE = process.env.NODE_ENV === 'development'
  ? `http://localhost:8000/api/v1`
  : import.meta.env.VITE_API_BASE;
const API_URL = "auth"

const signup = (email: string, password: string) => {
  return axios.post(`${API_BASE}/${API_URL}`, {
    email, password
  })
  .then(res => {
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  })
}

const login = (email: string,  password: string) => {
  return axios.post(`${API_BASE}/${API_URL}/signin`, {
    email, password
  })
  .then(res => {
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  })
}

const logout = (): void => {
  localStorage.removeItem("user");
}

const getCurrentUser = (): object => {
  return JSON.parse(localStorage.getItem("user")!)
}

export default {
  signup,
  login,
  logout,
  getCurrentUser
}