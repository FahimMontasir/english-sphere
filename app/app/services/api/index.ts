import Config from "app/config"
import axios from "axios"

/**
 *  Set defaults for all api endpoints
 */
const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 1000 * 15, // 15sc
})

export default api
