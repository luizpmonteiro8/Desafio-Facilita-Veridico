import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  timeoutErrorMessage: "Tempo limite excedido.",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
