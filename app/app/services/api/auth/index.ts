import api from ".."

const loginUser = (data) => {
  return api.post("/app/auth/login", data)
}

export const AuthApi = {
  loginUser,
}
