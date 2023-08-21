import { useState } from "react"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import auth from "@react-native-firebase/auth"
import messaging from "@react-native-firebase/messaging"
import { getTimeZone } from "react-native-localize"
import DeviceInfo from "react-native-device-info"
import Toast from "react-native-toast-message"
import Config from "src/config"
import { AuthApi } from "src/services/api/auth"
import { InitUser } from "src/models/UserStore"

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
  scopes: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
})

export const useLoginScreen = (setAuthTokenWithUser: (token: string, user: InitUser) => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const timezone = getTimeZone()

  const signIn = async () => {
    try {
      setIsLoading(true)

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const userInfo = await GoogleSignin.signIn()

      if (userInfo) {
        const { idToken, accessToken } = await GoogleSignin.getTokens()
        const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
        const user = await auth().signInWithCredential(credential)

        const token = await user?.user.getIdToken(true)
        const fcm = await messaging().getToken()

        const data = {
          token,
          fcmToken: {
            token: fcm,
            device: DeviceInfo.getModel(),
          },
          timezone,
        }

        const { accessToken: appAccessToken, createdUser } = await AuthApi.loginUser<typeof data>(
          data,
        )
        const { isBanned, ...appUser } = createdUser
        if (isBanned) {
          throw new Error("You're banned!!!")
        } else {
          setAuthTokenWithUser(appAccessToken, appUser)
        }
      }

      setIsLoading(false)
      Toast.show({
        type: "success",
        text1: "Congratulations, you are logged in!",
      })
    } catch (error: any) {
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
          text2: error?.message,
        })
      }
    }
  }
  return { signIn, isLoading }
}
