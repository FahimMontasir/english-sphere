import Config from "src/config"
import api from ".."
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import messaging from "@react-native-firebase/messaging"
import auth from "@react-native-firebase/auth"
import Toast from "react-native-toast-message"
import DeviceInfo from "react-native-device-info"

const loginUser = async <T>(input: T) => {
  const { data } = await api.post("/auth/app/login", input, {
    headers: { "x-api-key": Config.API_KEY },
  })
  return data.data
}

const logoutUser = async (logout: () => void) => {
  try {
    Toast.show({
      type: "info",
      text1: "Your logout process started!",
    })
    await api.post("/auth/app/logout", { fcmDevice: DeviceInfo.getModel() })
    await messaging().deleteToken()
    // to work sing out properly you need to configure again
    GoogleSignin.configure({})
    await GoogleSignin.signOut()
    await auth().signOut()
    logout()
    Toast.show({
      type: "info",
      text1: "You have logged out!",
    })
  } catch (error: any) {
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
