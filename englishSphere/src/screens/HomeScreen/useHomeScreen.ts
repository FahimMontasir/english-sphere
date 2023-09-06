import { useEffect, useState } from "react"
import messaging from "@react-native-firebase/messaging"
import DeviceInfo from "react-native-device-info"
import { FcmToken, InitUser } from "src/models/UserStore"
import { UserApi } from "src/services/api/user"

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

    // todo: check jwt expiration and user info (name, images, skills, banned,user up down votes, badges, home materials) update store accordingly

    // jwt expire
    // is banned
    // badges changes
    // home materials changes
    // name, images, skills and up/down votes changes

    return messaging().onTokenRefresh((token) => {
      handleFcmRefreshToken(token)
    })
  }, [])

  return { data, refreshing, handleRefresh }
}
