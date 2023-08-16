import { useEffect, useState } from "react"
import messaging from "@react-native-firebase/messaging"
import * as Device from "expo-device"
import { FcmToken, InitUser } from "app/models/UserStore"
import { UserApi } from "app/services/api/user"

export const useHomeScreen = (user: InitUser, setUserFcmToken: (v: FcmToken) => void) => {
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
    setData((prev) => [...prev, { thumbnail: "https://i.pravatar.cc/300", id: prev.at(-1).id + 1 }])
    setRefreshing(false)
  }

  const handleFcmRefreshToken = async (token: string) => {
    const isExits = user.fcmTokens.find((v) => v.token === token)
    if (!isExits) {
      const fcmToken = { token, device: Device.modelName }
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

    return messaging().onTokenRefresh((token) => {
      handleFcmRefreshToken(token)
    })
  }, [])

  return { data, refreshing, handleRefresh }
}
