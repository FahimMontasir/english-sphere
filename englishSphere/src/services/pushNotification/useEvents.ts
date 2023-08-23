import { useEffect } from "react"
import notifee, { EventType } from "@notifee/react-native"
import { NavigationProp } from "@react-navigation/native"
import { AppStackParamList } from "src/navigators"
import { NOTI_TYPE } from "./types"
import { HandleNotiData } from "./handleNotificationData"

const onForegroundEventHandler = (navigation: NavigationProp<AppStackParamList>) => {
  return notifee.onForegroundEvent(async ({ type, detail }) => {
    if (navigation) {
      if (type === EventType.PRESS && detail.pressAction?.id === NOTI_TYPE.APP_UPDATE) {
        navigation.navigate("Account")
      }

      // if it is positioned first user won't notice which one was unread
      if (type === EventType.PRESS) {
        HandleNotiData.readOne(detail.notification?.id as string)
      }
    }
  })
}

async function onBackgroundEventHandler(navigation: NavigationProp<AppStackParamList>) {
  const initialNotification = await notifee.getInitialNotification()

  if (initialNotification && navigation) {
    if (initialNotification.pressAction?.id === NOTI_TYPE.APP_UPDATE) {
      navigation.navigate("Account")
    }

    // if it is positioned first user won't notice which one was unread
    if (initialNotification.pressAction?.id) {
      HandleNotiData.readOne(initialNotification.notification?.id as string)
    }
  }
}

export default function useNotificationEvents(navigation: NavigationProp<AppStackParamList>) {
  useEffect(() => {
    onBackgroundEventHandler(navigation)
    return onForegroundEventHandler(navigation)
  }, [])
}
