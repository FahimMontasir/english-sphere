import { useState } from "react"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import * as Localization from "expo-localization"
import Toast from "react-native-toast-message"
import Config from "app/config"
import { SECURE_JWT_KEY, secureSave } from "app/utils/storage/secureStorageAsync"

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
  scopes: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
})

export const useLoginScreen = (setAuthToken: (v: string) => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const timezone = Localization.timezone

  const signIn = async () => {
    try {
      setIsLoading(true)

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const userInfo = await GoogleSignin.signIn()

      if (userInfo) {
        // make axios call here
        await secureSave(SECURE_JWT_KEY, "demojwttoken: ")
        setAuthToken("from settoken")
      }

      setIsLoading(false)
      Toast.show({
        type: "success",
        text1: "Congratulations, you are logged in!",
      })
    } catch (error) {
      setIsLoading(false)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show({
          type: "error",
          text1: "You have cancelled the login!",
        })
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show({
          type: "info",
          text1: "Your login is in progress already!",
        })
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show({
          type: "error",
          text1: "Your play services not available or outdated!",
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
        })
      }
    }
  }
  return { signIn, isLoading }
}
