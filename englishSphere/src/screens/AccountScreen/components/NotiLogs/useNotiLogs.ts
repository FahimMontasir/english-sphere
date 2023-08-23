import { NavigationProp } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { AppStackParamList } from "src/navigators"
import { storageEmitter } from "src/services/pushNotification"
import {
  HandleNotiData,
  NotiDisplayData,
} from "src/services/pushNotification/handleNotificationData"
import { NOTI_TYPE } from "src/services/pushNotification/types"

export const useNotiLogs = (navigation: NavigationProp<AppStackParamList>) => {
  const [notifications, setNotifications] = useState(HandleNotiData.load())
  const [modalVisible, setModalVisible] = useState(false)
  const [clickedItem, setClickedItem] = useState<NotiDisplayData>()

  useEffect(() => {
    const handleStorageChange = (key: string) => {
      if (key === "notification") {
        // reload
        setNotifications(HandleNotiData.load())
      }
    }

    storageEmitter.on("change", handleStorageChange)

    return () => {
      storageEmitter.off("change", handleStorageChange)
    }
  }, [])

  const handleNotiRoutes = (data: NotiDisplayData) => {
    if (data.unread) {
      HandleNotiData.readOne(data.data.id)
    }
    switch (data.data.type) {
      case NOTI_TYPE.DEFAULT:
        navigation.navigate("Home")
        break
      case NOTI_TYPE.APP_UPDATE:
        setClickedItem(data)
        setModalVisible(true)
        break

      default:
        break
    }
  }
  return {
    notifications,
    modalVisible,
    clickedItem,
    handleNotiRoutes,
    setModalVisible,
    setNotifications,
  }
}
