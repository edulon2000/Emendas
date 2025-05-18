import axios from "axios"

export const api = axios.create({
  baseURL: "https://emendas-production.up.railway.app/api",
})
