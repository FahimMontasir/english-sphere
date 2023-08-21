import Config from "src/config"
import axios from "axios"

/**
 *  Set defaults for all api endpoints
 */
const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 1000 * 60, // 1m
})

export default api
