import { useEffect, useState } from "react"
import messaging from "@react-native-firebase/messaging"
import DeviceInfo from "react-native-device-info"
import { FcmToken, InitUser } from "src/models/UserStore"
import { UserApi } from "src/services/api/user"
import { AuthApi } from "src/services/api/auth"
import Toast from "react-native-toast-message"

export const useHomeScreen = (
  user: InitUser,
  setUserFcmToken: (v: FcmToken) => void,
  logout: () => void,
  materialSections,
  setMaterialSections,
  badges,
  upVotes,
  downVotes,
  setBadges,
  setUpVotesDownVotes,
  setUser: (value: Partial<InitUser>) => void,
) => {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([
    { thumbnail: "https://i.pravatar.cc/300", id: 1 },
    { thumbnail: "https://i.pravatar.cc/300", id: 2 },
    { thumbnail: "https://i.pravatar.cc/300", id: 3 },
    { thumbnail: "https://i.pravatar.cc/300", id: 4 },
    { thumbnail: "https://i.pravatar.cc/300", id: 5 },
  ])

  const handleRefresh = () => {
    setRefreshing(true)
    setData((prev: any) => [
      ...prev,
      { thumbnail: "https://i.pravatar.cc/300", id: prev.at(-1).id + 1 },
    ])
    setRefreshing(false)
  }

  const handleFcmRefreshToken = async (token: string) => {
    const isExits = user.fcmTokens.find((v) => v.token === token)
    if (!isExits) {
      const fcmToken = { token, device: DeviceInfo.getModel() }
      setUserFcmToken(fcmToken)
      await UserApi.saveRefreshedFcmToken(fcmToken)
    }
  }

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        return handleFcmRefreshToken(token)
      })

    // up-to-date user info changes
    UserApi.getUpdatedUserInfo()
      .then((data) => {
        // is banned
        if (data.userData?.isBanned) {
          Toast.show({
            type: "error",
            text1: "You are banned!!!",
          })
          AuthApi.logoutUser(logout)
        } else {
          // home materials changes
          if (JSON.stringify(data.materialSections) !== JSON.stringify(materialSections)) {
            console.log("home materials changes")
            setMaterialSections(data.materialSections)
          }
          // badges changes
          if (JSON.stringify(data.userData.badges) !== JSON.stringify(badges)) {
            console.log(
              "badges changes",
              JSON.stringify(data.userData.badges),
              JSON.stringify(badges),
            )
            setBadges(data.userData.badges)
          }
          if (data.userData?.upVotes !== upVotes || data.userData?.downVotes !== downVotes) {
            // up/down votes changes
            console.log("up/down votes changes", data.userData?.upVotes, data.userData?.downVotes)
            setUpVotesDownVotes(data.userData.upVotes, data.userData.downVotes)
          }

          const storedUserData: Partial<InitUser> = {
            fullName: user.fullName,
            imageUrl: user.imageUrl,
            coverUrl: user.coverUrl || "",
            interests: user.interests,
            fcmTokens: user.fcmTokens,
          }
          const retrievedUserData: Partial<InitUser> = {
            fullName: data.userData.fullName,
            imageUrl: data.userData.imageUrl,
            coverUrl: data.userData?.coverUrl || "",
            interests: data.userData.interests as any,
            fcmTokens: data.userData.fcmTokens as any,
          }
          if (JSON.stringify(storedUserData) !== JSON.stringify(retrievedUserData)) {
            // name, images, skills changes
            console.log(
              "name, images, skills changes",
              storedUserData.fcmTokens?.map((v) => v),
              retrievedUserData.fcmTokens,
              storedUserData,
              retrievedUserData,
            )
            setUser(retrievedUserData)
          }
        }
      })
      .catch((error) => {
        console.log(error.response?.data?.message, "====error=====", error.message)
        // Network Error
        if (error?.message === "Network Error") {
          Toast.show({
            type: "error",
            text1: error?.message,
          })
        }
        // jwt expired
        if (error.response?.data?.message === "jwt expired") {
          Toast.show({
            type: "error",
            text1: "Your session expired!",
            text2: "Please login again with your google account.",
          })
          AuthApi.logoutUser(logout, false)
        }
        // unauthorized access
        if (error.response?.data?.message === "Forbidden") {
          AuthApi.logoutUser(logout, false)
        }
      })

    return messaging().onTokenRefresh((token) => {
      handleFcmRefreshToken(token)
    })
  }, [])

  return { data, refreshing, handleRefresh }
}
