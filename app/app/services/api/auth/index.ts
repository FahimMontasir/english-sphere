import Config from "app/config"
import api from ".."
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import auth from "@react-native-firebase/auth"
import Toast from "react-native-toast-message"
import { SECURE_JWT_KEY, secureDelete } from "app/utils/storage/secureStorageAsync"

const loginUser = async <T>(input: T) => {
  const { data } = await api.post("/auth/app/login", input, {
    headers: { "x-api-key": Config.API_KEY },
  })
  return data.data
}

const logoutUser = async (logout: () => void) => {
  try {
    await secureDelete(SECURE_JWT_KEY)
    await GoogleSignin.signOut()
    await auth().signOut()
    logout()
    Toast.show({
      type: "info",
      text1: "You have logged out!",
    })
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error?.message,
    })
  }
}

export const AuthApi = {
  loginUser,
  logoutUser,
}
